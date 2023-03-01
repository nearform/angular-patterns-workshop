import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { AccessTokenService } from './access-token.service'

export type ApiVersion = 3 | 4

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type RequestOptions = {
  method: HttpMethod
  url: string
  version?: ApiVersion
  body?: unknown
  headers?: Record<string, string | string[]>
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers: Record<string, string | string[]>

  constructor(
    private http: HttpClient,
    private accessTokenService: AccessTokenService
  ) {
    this.headers = {
      'Content-Type': 'application/json;charset=utf-8'
    }
  }

  private toUrl({
    url,
    version = 3
  }: {
    url: string
    version?: ApiVersion
  }): string {
    return `${environment.baseUrl}${version}/${url}`
  }

  // Use readonly access token for GETs
  get<TResponse>({ url, version }: { url: string; version?: ApiVersion }) {
    return this.http.get<TResponse>(this.toUrl({ url, version }), {
      headers: {
        ...this.headers,
        Authorization: `Bearer ${environment.readonlyAccessToken}`
      }
    })
  }

  post<TRequest, TResponse>({
    url,
    version,
    body,
    headers = {}
  }: {
    url: string
    version?: ApiVersion
    body: TRequest
    headers?: Record<string, string | string[]>
  }) {
    const accessToken = this.accessTokenService.getToken()
    return this.http.post<TResponse>(this.toUrl({ url, version }), body, {
      headers: {
        ...this.headers,
        ...(accessToken
          ? {
              Authorization: `Bearer ${accessToken}`
            }
          : {}),
        ...headers
      }
    })
  }

  put<TRequest, TResponse>({
    url,
    version,
    body
  }: {
    url: string
    version?: ApiVersion
    body: TRequest
  }) {
    const accessToken = this.accessTokenService.getToken()
    return this.http.put<TResponse>(this.toUrl({ url, version }), body, {
      headers: {
        ...this.headers,
        ...(accessToken
          ? {
              Authorization: `Bearer ${accessToken}`
            }
          : {})
      }
    })
  }

  delete<TRequest, TResponse>({
    url,
    version,
    body,
    headers = {}
  }: {
    url: string
    version?: ApiVersion
    body: TRequest
    headers?: Record<string, string | string[]>
  }) {
    const accessToken = this.accessTokenService.getToken()
    return this.http.delete<TResponse>(this.toUrl({ url, version }), {
      body,
      headers: {
        ...this.headers,
        ...(accessToken
          ? {
              Authorization: `Bearer ${accessToken}`
            }
          : {}),
        ...headers
      }
    })
  }
}
