import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatListModule } from '@angular/material/list'
import { combineLatest, map, Subject, switchMap, takeUntil } from 'rxjs'
import { MatSliderModule } from '@angular/material/slider'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { AddToWatchListConditionalService } from './add-to-watch-list-conditional.service'
import { withWatchlistFlag } from '../../app/utils/with-watch-list-flag'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@Component({
  selector: 'app-add-to-watch-list-conditional',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule
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
          <mat-card *ngFor="let movie of movies.data">
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
                *ngIf="!movie.onWatchlist"
                (click)="addToWatchList(movie.id)"
              >
                Add to watchlist
              </button>
              <button
                mat-stroked-button
                color="warn"
                *ngIf="movie.onWatchlist"
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

  movies$ = combineLatest([
    this.moviesService.getPopular(),
    this.moviesService.getUserWatchList()
  ]).pipe(
    map(([moviesQuery, watchlistQuery]) => ({
      isLoading: moviesQuery.isLoading || watchlistQuery.isLoading,
      data: withWatchlistFlag(moviesQuery?.data, watchlistQuery?.data)
    }))
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
