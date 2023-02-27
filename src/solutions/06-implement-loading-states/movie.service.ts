import { Injectable } from '@angular/core'
import { PagedApi } from '../../app/types/paged.types'
import {
  MovieSummary,
  MovieSummaryApi
} from '../../app/types/movie-summary.types'
import { map, startWith } from 'rxjs'
import { AsyncState } from '../../app/types/async-state.types'
import { ApiService } from '../../app/services/api.service'
import { tmdbPosterThumbnailUrl } from '../../app/utils/tmdb-poster-thumbnail-url'

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private api: ApiService) {}

  getPopular() {
    return this.api
      .get<PagedApi<MovieSummaryApi>>({ url: 'movie/popular' })
      .pipe(
        map(
          (data): AsyncState<MovieSummary[]> => ({
            isLoading: false,
            data: data.results.map(movie => ({
              id: movie.id,
              title: movie.title,
              description: movie.overview,
              poster: tmdbPosterThumbnailUrl(movie.poster_path)
            }))
          })
        ),
        startWith<AsyncState<MovieSummary[]>>({ isLoading: true })
      )
  }
}
