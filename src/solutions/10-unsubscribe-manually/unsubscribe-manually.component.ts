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
import { MovieService, MovieSummary } from '../../app/services/movie.service'
import { MatInputModule } from '@angular/material/input'

@Component({
  selector: 'app-unsubscribe-manually',
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
  `
})
export class UnsubscribeManuallyComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>()

  addToWatchList$ = new Subject<number>()
  removeFromWatchList$ = new Subject<number>()

  private popularMovies$ = this.moviesService
    .getPopular()
    .pipe(map(data => data.results))
  private watchList$ = this.moviesService.getUserWatchList().pipe(
    map(data => data.results),
    startWith([])
  )

  movies$ = combineLatest([this.popularMovies$, this.watchList$]).pipe(
    map(([movies, watchList]) => {
      return movies.map<MovieSummary & { onWatchList?: boolean }>(movie =>
        watchList.some(watchListMovieId => watchListMovieId === movie.id)
          ? { ...movie, onWatchList: true }
          : movie
      )
    })
  )

  constructor(private moviesService: MovieService) {}

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
