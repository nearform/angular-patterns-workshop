import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { combineLatest, map, Subject, switchMap, takeUntil } from 'rxjs';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Movie10Service } from './movie-10.service';
import { withWatchlistFlag } from '@app/utilities';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MovieSummaryCard10Component } from './movie-summary-card-10.component';

@Component({
  selector: 'app-solution-10',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MovieSummaryCard10Component,
  ],
  template: `
    <ng-container *ngIf="movies$ | async as movies">
      <div *ngIf="movies.isLoading" class="centered-content height-page">
        <mat-progress-spinner
          color="primary"
          mode="indeterminate"
          diameter="50"
        ></mat-progress-spinner>
      </div>
      <ng-container *ngIf="!movies.isLoading">
        <div *ngIf="movies$ | async as movies" class="stack">
          <app-movie-summary-card
            *ngFor="let movie of movies.data"
            [movie]="movie"
            (addToWatchlist)="addToWatchlist$.next($event)"
            (removeFromWatchlist)="removeFromWatchlist$.next($event)"
          ></app-movie-summary-card>
        </div>
      </ng-container>
    </ng-container>
  `,
})
export class MovieList10Component implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>();

  addToWatchlist$ = new Subject<number>();
  removeFromWatchlist$ = new Subject<number>();

  movies$ = combineLatest([
    this.moviesService.getPopular(),
    this.moviesService.getUserWatchlist(),
  ]).pipe(
    map(([moviesQuery, watchlistQuery]) => ({
      isLoading: moviesQuery.isLoading || watchlistQuery.isLoading,
      data: withWatchlistFlag(moviesQuery?.data, watchlistQuery?.data),
    }))
  );

  constructor(private moviesService: Movie10Service) {}

  ngOnInit() {
    this.addToWatchlist$
      .pipe(
        takeUntil(this.onDestroy$),
        switchMap((movieId) => this.moviesService.postWatchlist(movieId, true))
      )
      .subscribe();
    this.removeFromWatchlist$
      .pipe(
        takeUntil(this.onDestroy$),
        switchMap((movieId) => this.moviesService.postWatchlist(movieId, false))
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
