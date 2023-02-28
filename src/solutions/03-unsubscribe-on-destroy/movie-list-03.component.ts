import { Component, OnDestroy, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { delay, Subject, takeUntil } from 'rxjs'
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
      .pipe(
        // Add a false delay to simulate a very slow network connection
        delay(10_000),
        // We close this stream early if the component is destroyed
        takeUntil(this.onDestroy$)
      )
      .subscribe({
        next: data => console.log(data),
        complete: () => console.log('complete')
      })
  }

  ngOnDestroy() {
    this.onDestroy$.next()
  }
}
