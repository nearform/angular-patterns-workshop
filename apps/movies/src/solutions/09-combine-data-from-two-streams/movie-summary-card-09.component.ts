import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MovieSummaryWithWatchListFlag } from '@app/utilities';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-movie-summary-card',
  imports: [MatCardModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.Eager,
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
          [disabled]="movie.onWatchlist"
          (click)="addToWatchlist.emit(movie.id)"
        >
          Add to watchlist
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class MovieSummaryCard09Component {
  @Input()
  movie!: MovieSummaryWithWatchListFlag;
  @Output() addToWatchlist = new EventEmitter<number>();
}
