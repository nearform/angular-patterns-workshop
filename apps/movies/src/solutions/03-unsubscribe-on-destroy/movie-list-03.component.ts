import { Component, OnDestroy, OnInit } from '@angular/core'
import { delay, Subject, takeUntil } from 'rxjs'
import { Movie03Service } from './movie-03.service'

@Component({
  selector: 'app-solution-03',
  standalone: true,
  template: `<p>Hello world!!!</p>`
})
export class MovieList03Component implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>()
  constructor(private movieService: Movie03Service) {}

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
