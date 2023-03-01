import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Movie07Service } from './movie-07.service'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-solution-07',
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
export class MovieList07Component {
  movies$ = this.moviesService.getPopular()

  constructor(private moviesService: Movie07Service) {}

  addToWatchlist(id: number) {
    this.moviesService.postWatchlist(id, true).subscribe()
  }
}
