/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

const LOCALSTORAGE_AUTH_ACCESS_TOKEN_KEY = 'auth_request_token'

/**
 * Simple service to manage the access token
 *
 * (put in its own service so both the auth service and the api service can rely on it without introducing circular
 * dependencies)
 */
@Injectable({
  providedIn: 'root'
})
export class AccessTokenService {
  private _state$ = new BehaviorSubject<string | null>(
    localStorage.getItem(LOCALSTORAGE_AUTH_ACCESS_TOKEN_KEY)
  )

  state$ = this._state$.asObservable()

  getToken() {
    return this._state$.getValue()
  }

  setToken(token: string) {
    this._state$.next(token)
    localStorage.setItem(LOCALSTORAGE_AUTH_ACCESS_TOKEN_KEY, token)
  }

  removeToken() {
    this._state$.next(null)
    localStorage.removeItem(LOCALSTORAGE_AUTH_ACCESS_TOKEN_KEY)
  }
}
