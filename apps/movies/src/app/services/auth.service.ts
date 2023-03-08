/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import {
  BehaviorSubject,
  distinctUntilChanged,
  EMPTY,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { environment } from '../../environments/environment';
import { SessionService } from './session.service';
import { combineLatest } from 'rxjs';

type UserAvatarApi = {
  gravatar: {
    hash: string;
  };
  tmdb: {
    avatar_path: string | null;
  };
};

type UserApi = {
  id: number;
  username: string;
  name: string;
  iso_639_1: string;
  iso_3166_1: string;
  include_adult: boolean;
  avatar: UserAvatarApi;
};
export type User = {
  id: number;
  username: string;
};

type AuthState = {
  user: User | null;
  requestToken: string | null;
};

type RequestTokenResponse = {
  status_message: string;
  request_token: string;
  success: boolean;
  status_code: number;
};

type SessionResponse = {
  success: boolean;
  session_id: string;
};

type DeleteAccessTokenResponse = {
  status_message: string;
  success: boolean;
  status_code: number;
};

const LOCALSTORAGE_AUTH_REQUEST_TOKEN_KEY = 'auth_request_token';

const defaultState: AuthState = {
  user: null,
  requestToken: null,
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _state$ = new BehaviorSubject<AuthState>({
    ...defaultState,
    requestToken: localStorage.getItem(LOCALSTORAGE_AUTH_REQUEST_TOKEN_KEY),
  });

  state$ = this._state$.asObservable();

  loggedOut$ = combineLatest([this._state$, this.sessionService.state$]).pipe(
    map(([state, accessToken]) => !state.user && !accessToken)
  );

  user$ = this.state$.pipe(
    map(({ user }) => user),
    distinctUntilChanged(),
    switchMap((user) => {
      if (user) {
        return of(user);
      }
      return this.fetchUser();
    })
  );

  constructor(
    private api: ApiService,
    private sessionService: SessionService
  ) {}

  currentUser() {
    return this._state$.getValue().user;
  }

  requestAuthenticationRedirect() {
    const redirectTo = `${window.location.origin}/auth/approved`;

    return this.api.get<RequestTokenResponse>('authentication/token/new').pipe(
      tap((response) => {
        this._state$.next({
          ...this._state$.getValue(),
          requestToken: response.request_token,
        });

        localStorage.setItem(
          LOCALSTORAGE_AUTH_REQUEST_TOKEN_KEY,
          response.request_token
        );
      }),
      map(
        (response) =>
          `${environment.authRedirectUrl}/${response.request_token}?redirect_to=${redirectTo}`
      )
    );
  }

  private fetchUser() {
    return this.api.get<UserApi>('account').pipe(
      map(
        (userRaw): User => ({
          id: userRaw.id,
          username: userRaw.username,
        })
      ),
      tap({
        next: (user) => {
          this._state$.next({
            ...this._state$.getValue(),
            user,
          });
        },
        error: () => {
          this._state$.next({ ...this._state$.getValue(), user: null });
          localStorage.removeItem(LOCALSTORAGE_AUTH_REQUEST_TOKEN_KEY);
          this.sessionService.removeSessionId();
        },
      })
    );
  }

  completeSignIn() {
    return this.api
      .post<{ request_token: string }, SessionResponse>({
        path: 'authentication/session/new',
        body: { request_token: this._state$.getValue().requestToken! },
      })
      .pipe(
        tap(({ session_id }) => {
          this.sessionService.setSessionId(session_id);
        }),
        switchMap(() => this.fetchUser())
      );
  }

  restoreSession() {
    if (this.sessionService.getSessionId()) {
      return this.fetchUser();
    } else {
      return EMPTY;
    }
  }

  signOut() {
    const sessionId = this.sessionService.getSessionId();
    if (!sessionId) {
      return EMPTY;
    }

    return this.api
      .delete<{ session_id: string }, DeleteAccessTokenResponse>({
        path: 'authentication/session',
        body: { session_id: sessionId },
      })
      .pipe(
        tap(() => {
          this._state$.next(defaultState);
          localStorage.removeItem(LOCALSTORAGE_AUTH_REQUEST_TOKEN_KEY);
          this.sessionService.removeSessionId();
        })
      );
  }
}
