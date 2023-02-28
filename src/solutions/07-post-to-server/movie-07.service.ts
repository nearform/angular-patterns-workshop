import { Injectable } from '@angular/core'
import { map, startWith, throwError } from 'rxjs'
import { authStore } from '../../app/services/auth.service'
import { ApiService } from '../../app/services/api.service'
import { PagedApi } from '../../app/types/paged.types'
import {
  MovieSummary,
  MovieSummaryApi
} from '../../app/types/movie-summary.types'
import { AsyncState } from '../../app/types/async-state.types'
import {
  WatchlistRequestApi,
  WatchlistResponseApi
} from '../../app/types/watchlist.types'

@Injectable({
  providedIn: 'root'
})
export class Movie07Service {
  constructor(private api: ApiService) {}

  // See https://developers.themoviedb.org/3/movies/get-popular-movies
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
              poster: `https://image.tmdb.org/t/p/w92/${movie.poster_path}`
            }))
          })
        ),
        startWith<AsyncState<MovieSummary[]>>({ isLoading: true })
      )
  }

  // See https://developers.themoviedb.org/3/account/add-to-watchlist
  postWatchlist(movieId: number, isAdding: boolean) {
    const userId = authStore.getValue().user?.id
    if (!userId) {
      // `throwError` is the mechanism that rxjs provides to indicate an error
      return throwError(() => new Error('Requires user id'))
    }
    return this.api.post<WatchlistRequestApi, WatchlistResponseApi>({
      url: `account/${userId}/watchlist`,
      body: {
        media_type: 'movie',
        media_id: movieId,
        watchlist: isAdding
      }
    })
  }
}
