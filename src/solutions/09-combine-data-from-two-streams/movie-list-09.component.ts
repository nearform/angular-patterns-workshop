import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatListModule } from '@angular/material/list'
import { combineLatest, map, Subject, switchMap, takeUntil } from 'rxjs'
import { MatSliderModule } from '@angular/material/slider'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { Movie09Service } from './movie-09.service'
import { withWatchlistFlag } from '../../app/utils/with-watchlist-flag'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MovieSummaryCard09Component } from './movie-summary-card-09.component'

@Component({
  selector: 'app-solution-09',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MovieSummaryCard09Component
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
          >
          </app-movie-summary-card>
        </div>
      </ng-container>
    </ng-container>
  `
})
export class MovieList09Component implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>()

  addToWatchlist$ = new Subject<number>()
  movies$ = combineLatest([
    this.moviesService.getPopular(),
    this.moviesService.getUserWatchlist()
  ]).pipe(
    map(([moviesQuery, watchlistQuery]) => ({
      isLoading: moviesQuery.isLoading || watchlistQuery.isLoading,
      data: withWatchlistFlag(moviesQuery?.data, watchlistQuery?.data)
    }))
  )

  constructor(private moviesService: Movie09Service) {}

  ngOnInit() {
    this.addToWatchlist$
      .pipe(
        takeUntil(this.onDestroy$),
        switchMap(movieId => this.moviesService.postWatchlist(movieId, true))
      )
      .subscribe()
  }

  ngOnDestroy() {
    this.onDestroy$.next()
  }
}
