/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { createStore, select, withProps } from '@ngneat/elf'
import { filter, map, switchMap, tap } from 'rxjs'
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state'
import { environment } from '../../environments/environment'

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

const defaultState: AuthProps = {
  user: null,
  requestToken: null,
  accessToken: null
}

export const authStore = createStore(
  {
    name: 'auth'
  },
  withProps<AuthProps>(defaultState)
)

persistState(authStore, {
  key: 'auth',
  storage: localStorageStrategy,
  source: store =>
    store.pipe(
      map(({ requestToken, accessToken }) => ({ requestToken, accessToken }))
    )
})

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
        }
      })
    )
  }

  completeSignIn() {
    return authStore.pipe(
      select(state => state.requestToken),
      switchMap(requestToken =>
        this.api
          .post<{ request_token: string }, AccessTokenResponse>({
            url: 'auth/access_token',
            version: 4,
            body: { request_token: requestToken! },
            headers: {
              Authorization: `Bearer ${environment.readonlyAccessToken}`
            }
          })
          .pipe(
            tap(({ access_token }) =>
              authStore.update(state => ({
                ...state,
                accessToken: access_token
              }))
            ),
            switchMap(() => this.fetchUser())
          )
      )
    )
  }

  restoreSession() {
    return authStore.pipe(
      select(state => state.accessToken),
      tap(sessionId => {
        if (!sessionId) {
          authStore.update(state => ({ ...state }))
        }
      }),
      filter(Boolean),
      switchMap(() => this.fetchUser())
    )
  }

  signOut() {
    return authStore.pipe(
      tap(() => authStore.update(() => defaultState)),
      filter((authProps: AuthProps) => Boolean(authProps.accessToken)),
      switchMap(store =>
        this.api.delete<{ access_token: string }, DeleteAccessTokenResponse>({
          url: 'auth/access_token',
          version: 4,
          body: { access_token: store.accessToken! },
          headers: {
            Authorization: `Bearer ${environment.readonlyAccessToken}`
          }
        })
      )
    )
  }
}
