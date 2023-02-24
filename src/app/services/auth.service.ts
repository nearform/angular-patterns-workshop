/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { createStore, withProps } from '@ngneat/elf'
import { EMPTY, map, switchMap, tap } from 'rxjs'
import { environment } from 'src/environments/environment'

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

type AuthProps = {
  user: User | null
  requestToken: string | null
  accessToken: string | null
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
const LOCALSTORAGE_AUTH_ACCESS_TOKEN_KEY = 'auth_request_token'

const defaultState: AuthProps = {
  user: null,
  requestToken: null,
  accessToken: null
}

export const authStore = createStore(
  {
    name: 'auth'
  },
  withProps<AuthProps>({
    ...defaultState,
    requestToken: localStorage.getItem(LOCALSTORAGE_AUTH_REQUEST_TOKEN_KEY),
    accessToken: localStorage.getItem(LOCALSTORAGE_AUTH_ACCESS_TOKEN_KEY)
  })
)

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  state$ = authStore.asObservable()

  loggedOut$ = this.state$.pipe(map(state => !state.user && !state.accessToken))

  constructor(private api: ApiService) {}

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
          authStore.update(state => ({
            ...state,
            requestToken: response.request_token
          }))
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
          authStore.update(state => ({
            ...state,
            user: {
              id: userRaw.id,
              username: userRaw.username
            }
          }))
        },
        error: () => {
          authStore.update(state => ({ ...state, user: null }))
          localStorage.removeItem(LOCALSTORAGE_AUTH_REQUEST_TOKEN_KEY)
          localStorage.removeItem(LOCALSTORAGE_AUTH_ACCESS_TOKEN_KEY)
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
        body: { request_token: authStore.getValue().requestToken! },
        headers: {
          Authorization: `Bearer ${environment.readonlyAccessToken}`
        }
      })
      .pipe(
        tap(({ access_token }) => {
          authStore.update(state => ({
            ...state,
            accessToken: access_token
          }))
          localStorage.setItem(LOCALSTORAGE_AUTH_ACCESS_TOKEN_KEY, access_token)
        }),
        switchMap(() => this.fetchUser())
      )
  }

  restoreSession() {
    if (authStore.getValue().accessToken) {
      return this.fetchUser()
    } else {
      return EMPTY
    }
  }

  signOut() {
    const accessToken = authStore.getValue().accessToken
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
          authStore.update(() => defaultState)
          localStorage.removeItem(LOCALSTORAGE_AUTH_REQUEST_TOKEN_KEY)
          localStorage.removeItem(LOCALSTORAGE_AUTH_ACCESS_TOKEN_KEY)
        })
      )
  }
}
