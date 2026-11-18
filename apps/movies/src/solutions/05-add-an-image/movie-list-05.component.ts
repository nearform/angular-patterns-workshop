import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Movie05Service } from './movie-05.service';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MovieSummaryCard05Component } from './movie-summary-card-05.component';

@Component({
  selector: 'app-solution-05',
  imports: [
    CommonModule,
    MatListModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MovieSummaryCard05Component,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    @if (movies$ | async; as movies) {
      <div class="stack">
        @for (movie of movies; track movie) {
          <app-movie-summary-card [movie]="movie"></app-movie-summary-card>
        }
      </div>
    }
  `,
})
export class MovieList05Component {
  movies$ = this.moviesService.getPopular();

  constructor(private moviesService: Movie05Service) {}
}
