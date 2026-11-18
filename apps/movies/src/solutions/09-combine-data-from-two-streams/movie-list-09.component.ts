import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { combineLatest, map, Subject, switchMap, takeUntil } from 'rxjs';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Movie09Service } from './movie-09.service';
import { withWatchlistFlag } from '@app/utilities';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MovieSummaryCard09Component } from './movie-summary-card-09.component';

@Component({
  selector: 'app-solution-09',
  imports: [
    CommonModule,
    MatListModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MovieSummaryCard09Component,
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
        @if (movies$ | async; as movies) {
          <div class="stack">
            @for (movie of movies.data; track movie) {
              <app-movie-summary-card
                [movie]="movie"
                (addToWatchlist)="addToWatchlist$.next($event)"
              >
              </app-movie-summary-card>
            }
          </div>
        }
      }
    }
  `,
})
export class MovieList09Component implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>();

  addToWatchlist$ = new Subject<number>();
  movies$ = combineLatest([
    this.moviesService.getPopular(),
    this.moviesService.getUserWatchlist(),
  ]).pipe(
    map(([moviesQuery, watchlistQuery]) => ({
      isLoading: moviesQuery.isLoading || watchlistQuery.isLoading,
      data: withWatchlistFlag(moviesQuery?.data, watchlistQuery?.data),
    })),
  );

  constructor(private moviesService: Movie09Service) {}

  ngOnInit() {
    this.addToWatchlist$
      .pipe(
        takeUntil(this.onDestroy$),
        switchMap((movieId) => this.moviesService.postWatchlist(movieId, true)),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
