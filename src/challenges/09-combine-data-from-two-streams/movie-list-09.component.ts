import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Movie09Service } from './movie-09.service'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { delay, Subject, switchMap, takeUntil } from 'rxjs'

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule
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
        <div class="stack">
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
                (click)="addToWatchlist(movie.id)"
              >
                Add to watchlist
              </button>
            </mat-card-actions>
          </mat-card>
        </div>
      </ng-container>
    </ng-container>
  `
})
export class MovieList09Component implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>()
  private addToWatchList$ = new Subject<number>()
  movies$ = this.moviesService.getPopular()

  constructor(private moviesService: Movie09Service) {}

  ngOnInit() {
    this.addToWatchList$
      .pipe(
        // Simulate a slow network response
        delay(10_000),
        takeUntil(this.onDestroy$),
        // Due to `takeUntil` above, this will never be called if you click the "Add to watchlist" button
        // and navigate away before the delay has completed
        switchMap(id => this.moviesService.postWatchlist(id, true))
      )
      .subscribe({
        complete: () => {
          // Check that this fires on navigating away
          console.log('complete')
        }
      })
  }

  ngOnDestroy() {
    this.onDestroy$.next()
  }

  addToWatchlist(id: number) {
    this.addToWatchList$.next(id)
  }
}
