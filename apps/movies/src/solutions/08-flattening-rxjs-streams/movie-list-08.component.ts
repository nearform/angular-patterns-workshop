import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie08Service } from './movie-08.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { MovieSummaryCard08Component } from './movie-summary-card-08.component';

@Component({
  selector: 'app-solution-08',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MovieSummaryCard08Component,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    @if (movies$ | async; as movies) {
      @if (movies.isLoading) {
        <div class="centered-content height-page">
          <mat-progress-spinner
            color="primary"
            mode="indeterminate"
            diameter="50"
          ></mat-progress-spinner>
        </div>
      }
      @if (!movies.isLoading) {
        <div class="stack">
          @for (movie of movies.data; track movie) {
            <app-movie-summary-card
              [movie]="movie"
              (addToWatchList)="addToWatchlist$.next($event)"
            >
            </app-movie-summary-card>
          }
        </div>
      }
    }
  `,
})
export class MovieList08Component implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();
  addToWatchlist$ = new Subject<number>();
  movies$ = this.moviesService.getPopular();

  constructor(private moviesService: Movie08Service) {}

  ngOnInit() {
    this.addToWatchlist$
      .pipe(
        takeUntil(this.onDestroy$),
        switchMap((id) => this.moviesService.postWatchlist(id, true)),
      )
      .subscribe({
        complete: () => {
          // Check that this fires on navigating away
          // eslint-disable-next-line no-console
          console.log('complete');
        },
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
