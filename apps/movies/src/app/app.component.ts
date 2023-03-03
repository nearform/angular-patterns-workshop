import { RouterModule } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { AuthButtonComponent } from './auth/auth-button.component'
import { AuthService } from './services/auth.service'
import { Subject, takeUntil } from 'rxjs'

@Component({
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    AuthButtonComponent
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-patterns-workshop'

  onDestroy$ = new Subject<void>()

  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authService
      .restoreSession()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe()
  }

  ngOnDestroy() {
    this.onDestroy$.next()
  }
}
