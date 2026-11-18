import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-approved',
  imports: [MatCardModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './auth-approved.component.html',
})
export class AuthApprovedComponent implements OnDestroy, OnInit {
  private readonly onDestroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.authService
      .completeSignIn()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
