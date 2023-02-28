import { Component, OnInit } from '@angular/core'
import { Movie02Service } from './movie-02.service'

@Component({
  standalone: true,
  template: `<p>Hello world!!!</p>`
})
export class MovieList02Component implements OnInit {
  constructor(private movieService: Movie02Service) {}

  ngOnInit() {
    this.movieService.getPopular().subscribe(movies => {
      console.log(movies)
    })
  }
}
