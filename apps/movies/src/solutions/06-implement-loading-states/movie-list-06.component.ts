import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie06Service } from './movie-06.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MovieSummaryCard06Component } from './movie-summary-card-06.component';

@Component({
  selector: 'app-solution-06',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MovieSummaryCard06Component,
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
            <app-movie-summary-card [movie]="movie"></app-movie-summary-card>
          }
        </div>
      }
    }
  `,
})
export class MovieList06Component {
  movies$ = this.moviesService.getPopular();

  constructor(private moviesService: Movie06Service) {}
}
