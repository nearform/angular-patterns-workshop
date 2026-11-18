import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MovieSummary } from '@app/utilities';

@Component({
  selector: 'app-movie-summary-card',
  imports: [MatCardModule],
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
    </mat-card>
  `,
})
export class MovieSummaryCard05Component {
  @Input()
  movie!: MovieSummary;
}
