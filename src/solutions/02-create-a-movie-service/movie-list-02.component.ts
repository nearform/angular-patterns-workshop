import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Movie02Service } from './movie-02.service'

@Component({
  selector: 'app-movie-list-02-component',
  standalone: true,
  imports: [CommonModule],
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
