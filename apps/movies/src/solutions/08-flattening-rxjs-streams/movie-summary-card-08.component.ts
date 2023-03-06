import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MovieSummary } from '../../app/types/movie-summary.types';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-movie-summary-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
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
      <mat-card-actions>
        <button
          mat-stroked-button
          color="primary"
          (click)="addToWatchList.emit(movie.id)"
        >
          Add to watchlist
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class MovieSummaryCard08Component {
  @Input()
  movie!: MovieSummary;
  @Output() addToWatchList = new EventEmitter<number>();
}
