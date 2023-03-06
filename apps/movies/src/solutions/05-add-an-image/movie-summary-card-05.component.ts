import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MovieSummary } from '../../app/types/movie-summary.types';

@Component({
  selector: 'app-movie-summary-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ movie.title }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <div class="flex">
          <img [src]="movie.poster" [alt]="movie.title" />
          <p>
            {{ movie.overview }}
          </p>
        </div>
      </mat-card-content>
    </mat-card>
  `,
})
export class MovieSummaryCard05Component {
  @Input()
  movie!: MovieSummary;
}
