import { Component, OnInit } from '@angular/core'
import { Movie03Service } from './movie-03.service'

@Component({
  standalone: true,
  template: `<p>Hello world!!!</p>`
})
export class MovieList03Component implements OnInit {
  constructor(private movieService: Movie03Service) {}

  ngOnInit() {
    this.movieService.getPopular().subscribe(movies => {
      console.log(movies)
    })
  }
}
