import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Movie05Service } from './movie-05.service'
import { MatListModule } from '@angular/material/list'
import { MatSliderModule } from '@angular/material/slider'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MovieSummaryCard05Component } from './movie-summary-card-05.component'

@Component({
  selector: 'app-solution-05',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MovieSummaryCard05Component
  ],
  template: `
    <div *ngIf="movies$ | async as movies" class="stack">
      <app-movie-summary-card
        *ngFor="let movie of movies"
        [movie]="movie"
      ></app-movie-summary-card>
    </div>
  `
})
export class MovieList05Component {
  movies$ = this.moviesService.getPopular()

  constructor(private moviesService: Movie05Service) {}
}
