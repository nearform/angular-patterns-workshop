import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Subject, takeUntil } from 'rxjs'
import { MovieService } from '../02-create-a-movie-service/movie.service'
@Component({
  selector: 'app-movie-list-03-component',
  standalone: true,
  imports: [CommonModule],
  template: `<p>Hello world!!!</p>`
})
export class MovieList03Component implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>()
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService
      .getPopular()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(movies => {
        console.log(movies)
      })
  }

  ngOnDestroy() {
    this.onDestroy$.next()
  }
}
