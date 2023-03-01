import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Movie06Service } from './movie-06.service'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MovieSummaryCard06Component } from './movie-summary-card-06.component'

@Component({
  selector: 'app-solution-06',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MovieSummaryCard06Component
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
          <app-movie-summary-card
            *ngFor="let movie of movies.data"
            [movie]="movie"
          ></app-movie-summary-card>
        </div>
      </ng-container>
    </ng-container>
  `
})
export class MovieList06Component {
  movies$ = this.moviesService.getPopular()

  constructor(private moviesService: Movie06Service) {}
}
