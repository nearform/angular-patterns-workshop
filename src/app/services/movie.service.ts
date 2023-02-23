import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Paged, PagedApi } from './paged'
import { map } from 'rxjs'

export type MovieSummaryApi = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: false
  vote_average: number
  vote_count: number
}

export type MovieSummary = {
  id: number
  title: string
  description: string
  poster?: string
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private api: ApiService) {}

  // See https://developers.themoviedb.org/3/movies/get-popular-movies
  getPopular() {
    return this.api
      .get<PagedApi<MovieSummaryApi>>({ url: 'movie/popular' })
      .pipe<Paged<MovieSummary>>(
        map(data => ({
          page: data.page,
          totalPages: data.total_pages,
          results: data.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            poster: `https://image.tmdb.org/t/p/w92/${movie.poster_path}`
          })),
          totalResults: data.total_results
        }))
      )
  }
}
