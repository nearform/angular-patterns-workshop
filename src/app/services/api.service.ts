import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { SessionService } from './session.service'

const API_VERSION = 3

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers: Record<string, string | string[]>

  constructor(
    private http: HttpClient,
    private accessTokenService: SessionService
  ) {
    this.headers = {
      'Content-Type': 'application/json;charset=utf-8'
    }
  }

  private toUrl(path: string): string {
    const url = new URL(`${API_VERSION}/${path}`, environment.baseUrl)
    const params = new URLSearchParams(url.search)
    params.append('api_key', environment.apiKey)

    const sessionId = this.accessTokenService.getSessionId()
    if (sessionId) {
      params.append('session_id', sessionId)
    }

    return `${url.origin}${url.pathname}?${params}`
  }

  // Use readonly access token for GETs
  get<TResponse>(path: string) {
    return this.http.get<TResponse>(this.toUrl(path), {
      headers: this.headers
    })
  }

  post<TRequest, TResponse>({
    path,
    body,
    headers = {}
  }: {
    path: string
    body: TRequest
    headers?: Record<string, string | string[]>
  }) {
    return this.http.post<TResponse>(this.toUrl(path), body, {
      headers: { ...this.headers, ...headers }
    })
  }

  put<TRequest, TResponse>({
    path,
    body,
    headers = {}
  }: {
    path: string
    body: TRequest
    headers?: Record<string, string | string[]>
  }) {
    return this.http.put<TResponse>(this.toUrl(path), body, {
      headers: { ...this.headers, ...headers }
    })
  }

  delete<TRequest, TResponse>({
    path,
    body,
    headers = {}
  }: {
    path: string
    body: TRequest
    headers?: Record<string, string | string[]>
  }) {
    return this.http.delete<TResponse>(this.toUrl(path), {
      body,
      headers: { ...this.headers, ...headers }
    })
  }
}
