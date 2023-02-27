import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatListModule } from '@angular/material/list'
import {
  combineLatest,
  map,
  startWith,
  Subject,
  switchMap,
  takeUntil
} from 'rxjs'
import { MatSliderModule } from '@angular/material/slider'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { AddToWatchListConditionalService } from './add-to-watch-list-conditional.service'
import { MovieSummary } from '../../app/types/movie-summary.types'

@Component({
  selector: 'app-add-to-watch-list-conditional',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ],
  template: `
    <ng-container *ngIf="{ isLoading: isLoading$ | async } as context">
      <div *ngIf="context.isLoading">Loading...</div>
      <ng-container *ngIf="!context.isLoading">
        <div *ngIf="movies$ | async as movies" class="stack">
          <mat-card *ngFor="let movie of movies">
            <mat-card-header>
              <mat-card-title>{{ movie.title }}</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="flex">
                <img [src]="movie.poster" [alt]="movie.title" />
                <p>
                  {{ movie.description }}
                </p>
              </div>
            </mat-card-content>
            <mat-card-actions>
              <button
                mat-stroked-button
                color="primary"
                *ngIf="!movie.onWatchList"
                (click)="addToWatchList(movie.id)"
              >
                Add to watchlist
              </button>
              <button
                mat-stroked-button
                color="warn"
                *ngIf="movie.onWatchList"
                (click)="removeFromWatchList(movie.id)"
              >
                Remove from watchlist
              </button>
            </mat-card-actions>
          </mat-card>
        </div>
      </ng-container>
    </ng-container>
  `
})
export class AddToWatchListConditionalComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>()

  addToWatchList$ = new Subject<number>()
  removeFromWatchList$ = new Subject<number>()

  private popularMoviesQuery$ = this.moviesService.getPopular()
  private watchlistQuery$ = this.moviesService.getUserWatchList()

  // Extract the actual results out of the response for each query
  private popularMoviesItems$ = this.popularMoviesQuery$.pipe(
    map(movies => (movies.data ? movies.data.results : []))
  )
  private watchlistItems$ = this.watchlistQuery$.pipe(
    map(watchlist => (watchlist.data ? watchlist.data.results : [])),
    startWith([])
  )

  isLoading$ = combineLatest([
    this.popularMoviesQuery$,
    this.watchlistQuery$
  ]).pipe(
    map(
      ([popularMoviesQuery, watchListQuery]) =>
        popularMoviesQuery.isLoading || watchListQuery.isLoading
    ),
    startWith(true)
  )

  movies$ = combineLatest([
    this.popularMoviesItems$,
    this.watchlistItems$
  ]).pipe(
    map(([movies, watchlist]) => {
      return movies.map<MovieSummary & { onWatchList?: boolean }>(movie =>
        watchlist.some(watchListMovieId => watchListMovieId === movie.id)
          ? { ...movie, onWatchList: true }
          : movie
      )
    })
  )

  constructor(private moviesService: AddToWatchListConditionalService) {}

  ngOnInit() {
    this.addToWatchList$
      .pipe(
        takeUntil(this.onDestroy$),
        switchMap(movieId => this.moviesService.postWatchlist(movieId, true))
      )
      .subscribe()
    this.removeFromWatchList$
      .pipe(
        takeUntil(this.onDestroy$),
        switchMap(movieId => this.moviesService.postWatchlist(movieId, false))
      )
      .subscribe()
  }

  ngOnDestroy() {
    this.onDestroy$.next()
  }

  addToWatchList(id: number) {
    this.addToWatchList$.next(id)
  }

  removeFromWatchList(id: number) {
    this.removeFromWatchList$.next(id)
  }
}
