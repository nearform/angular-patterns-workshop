import { Component, OnDestroy, OnInit } from '@angular/core'
import { delay, Subject, takeUntil } from 'rxjs'
import { Movie04Service } from './movie-04.service'

@Component({
  standalone: true,
  template: `<p>Hello world!!!</p>`
})
export class MovieList04Component implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>()
  constructor(private movieService: Movie04Service) {}

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
