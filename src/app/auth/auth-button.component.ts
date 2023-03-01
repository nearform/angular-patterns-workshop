import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { map, Subject, switchMap, takeUntil, tap } from 'rxjs'
import { AuthService } from '../services/auth.service'
import { MatButtonModule } from '@angular/material/button'
import { Router } from '@angular/router'

@Component({
  selector: 'app-auth-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './auth-button.component.html'
})
export class AuthButtonComponent implements OnInit, OnDestroy {
  private clickSignIn$ = new Subject<void>()
  private clickSignOut$ = new Subject<void>()
  onDestroy$ = new Subject<void>()
  loggedOut$ = this.authService.loggedOut$
  loggedIn$ = this.authService.loggedOut$.pipe(map(loggedOut => !loggedOut))

  userName$ = this.authService.state$.pipe(map(state => state.user?.username))

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.clickSignIn$.next()
  }

  logout() {
    console.log('logout')
    this.clickSignOut$.next()
  }

  ngOnInit() {
    this.clickSignIn$
      .pipe(
        switchMap(() => this.authService.requestAuthenticationRedirect()),
        takeUntil(this.onDestroy$)
      )
      .subscribe(url => (window.location.href = url))

    this.clickSignOut$
      .pipe(
        tap(() => {
          console.log('sign out 1')
        }),
        switchMap(() => this.authService.signOut()),
        takeUntil(this.onDestroy$)
      )
      .subscribe(() => this.router.navigate(['/']))
  }

  ngOnDestroy() {
    this.onDestroy$.next()
  }
}
