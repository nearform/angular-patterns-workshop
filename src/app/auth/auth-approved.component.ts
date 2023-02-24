import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { Subject, takeUntil } from 'rxjs'
import { MatCardModule } from '@angular/material/card'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-auth-approved',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './auth-approved.component.html'
})
export class AuthApprovedComponent implements OnDestroy, OnInit {
  private readonly onDestroy$ = new Subject<void>()

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService
      .completeSignIn()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.router.navigate(['/'])
      })
  }

  ngOnDestroy() {
    this.onDestroy$.next()
  }
}
