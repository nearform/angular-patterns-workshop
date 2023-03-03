/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

const LOCALSTORAGE_SESSION_ID_KEY = 'session_id'

/**
 * Simple service to manage the access token
 *
 * (put in its own service so both the auth service and the api service can rely on it without introducing circular
 * dependencies)
 */
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private _state$ = new BehaviorSubject<string | null>(
    localStorage.getItem(LOCALSTORAGE_SESSION_ID_KEY)
  )

  state$ = this._state$.asObservable()

  getSessionId() {
    return this._state$.getValue()
  }

  setSessionId(token: string) {
    this._state$.next(token)
    localStorage.setItem(LOCALSTORAGE_SESSION_ID_KEY, token)
  }

  removeSessionId() {
    this._state$.next(null)
    localStorage.removeItem(LOCALSTORAGE_SESSION_ID_KEY)
  }
}
