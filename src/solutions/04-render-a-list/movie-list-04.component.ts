import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatListModule } from '@angular/material/list'
import { MatSliderModule } from '@angular/material/slider'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { Movie04Service } from './movie-04.service'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@Component({
  selector: 'app-movie-list-04-component',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div *ngIf="movies$ | async as movies" class="stack">
      <mat-card *ngFor="let movie of movies">
        <mat-card-header>
          <mat-card-title>{{ movie.title }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>
            {{ movie.description }}
          </p>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class MovieList04Component {
  movies$ = this.moviesService.getPopular()

  constructor(private moviesService: Movie04Service) {}
}
