import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie07Service } from './movie-07.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MovieSummaryCard07Component } from './movie-summary-card-07.component';

@Component({
  selector: 'app-solution-07',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MovieSummaryCard07Component,
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
              (addToWatchList)="addToWatchlist($event)"
            >
            </app-movie-summary-card>
          }
        </div>
      }
    }
  `,
})
export class MovieList07Component {
  movies$ = this.moviesService.getPopular();

  constructor(private moviesService: Movie07Service) {}

  addToWatchlist(id: number) {
    this.moviesService.postWatchlist(id, true).subscribe();
  }
}
