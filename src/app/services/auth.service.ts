/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { BehaviorSubject, EMPTY, map, switchMap, tap } from 'rxjs'
import { environment } from '../../environments/environment'
import { AccessTokenService } from './access-token.service'
import { combineLatest } from 'rxjs'

type UserAvatarApi = {
  gravatar: {
    hash: string
  }
  tmdb: {
    avatar_path: string | null
  }
}

type UserApi = {
  id: number
  username: string
  name: string
  iso_639_1: string
  iso_3166_1: string
  include_adult: boolean
  avatar: UserAvatarApi
}
export type User = {
  id: number
  username: string
}

type AuthState = {
  user: User | null
  requestToken: string | null
}

type RequestTokenResponse = {
  status_message: string
  request_token: string
  success: boolean
  status_code: number
}

type AccessTokenResponse = {
  account_id: string
  access_token: string
  success: boolean
  status_message: string
  status_code: number
}

type DeleteAccessTokenResponse = {
  status_message: string
  success: boolean
  status_code: number
}

const LOCALSTORAGE_AUTH_REQUEST_TOKEN_KEY = 'auth_request_token'

const defaultState: AuthState = {
  user: null,
  requestToken: null
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _state$ = new BehaviorSubject<AuthState>({
    ...defaultState,
    requestToken: localStorage.getItem(LOCALSTORAGE_AUTH_REQUEST_TOKEN_KEY)
  })

  state$ = this._state$.asObservable()

  loggedOut$ = combineLatest([
    this._state$,
    this.accessTokenService.state$
  ]).pipe(map(([state, accessToken]) => !state.user && !accessToken))

  constructor(
    private api: ApiService,
    private accessTokenService: AccessTokenService
  ) {}

  currentUser() {
    return this._state$.getValue().user
  }

  requestAuthenticationRedirect() {
    const redirectTo = `${location.protocol}//${location.hostname}:${location.port}/auth/approved`

    return this.api
      .post<{ redirect_to: string }, RequestTokenResponse>({
        url: 'auth/request_token',
        version: 4,
        body: {
          redirect_to: redirectTo
        },
        headers: {
          Authorization: `Bearer ${environment.readonlyAccessToken}`
        }
      })
      .pipe(
        tap(response => {
          this._state$.next({
            ...this._state$.getValue(),
            requestToken: response.request_token
          })

          localStorage.setItem(
            LOCALSTORAGE_AUTH_REQUEST_TOKEN_KEY,
            response.request_token
          )
        }),
        map(
          response =>
            `${environment.authRedirectUrl}?request_token=${response.request_token}`
        )
      )
  }

  private fetchUser() {
    return this.api.get<UserApi>({ url: `account` }).pipe(
      tap({
        next: userRaw => {
          this._state$.next({
            ...this._state$.getValue(),
            user: {
              id: userRaw.id,
              username: userRaw.username
            }
          })
        },
        error: () => {
          this._state$.next({ ...this._state$.getValue(), user: null })
          localStorage.removeItem(LOCALSTORAGE_AUTH_REQUEST_TOKEN_KEY)
          this.accessTokenService.removeToken()
        }
      })
    )
  }

  completeSignIn() {
    // TODO An extra (but cancelled) call is being made here for some reason
    return this.api
      .post<{ request_token: string }, AccessTokenResponse>({
        url: 'auth/access_token',
        version: 4,
        body: { request_token: this._state$.getValue().requestToken! },
        headers: {
          Authorization: `Bearer ${environment.readonlyAccessToken}`
        }
      })
      .pipe(
        tap(({ access_token }) => {
          this.accessTokenService.setToken(access_token)
        }),
        switchMap(() => this.fetchUser())
      )
  }

  restoreSession() {
    if (this.accessTokenService.getToken()) {
      return this.fetchUser()
    } else {
      return EMPTY
    }
  }

  signOut() {
    const accessToken = this.accessTokenService.getToken()
    if (!accessToken) {
      return EMPTY
    }
    // TODO for some reason an extra call to the DELETE endpoint is still being made
    return this.api
      .delete<{ access_token: string }, DeleteAccessTokenResponse>({
        url: 'auth/access_token',
        version: 4,
        body: { access_token: accessToken },
        headers: {
          Authorization: `Bearer ${environment.readonlyAccessToken}`
        }
      })
      .pipe(
        tap(() => {
          this._state$.next(defaultState)
          localStorage.removeItem(LOCALSTORAGE_AUTH_REQUEST_TOKEN_KEY)
          this.accessTokenService.removeToken()
        })
      )
  }
}
