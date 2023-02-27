import { Injectable } from '@angular/core'
import {
  combineLatest,
  filter,
  map,
  startWith,
  Subject,
  switchMap,
  tap,
  throwError
} from 'rxjs'
import { select } from '@ngneat/elf'
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
export class AddWatchlistConditionalService {
  // Triggered after an update to the watch list and used to re-trigger watch list query
  private watchlistUpdated$ = new Subject<void>()

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

  postWatchlist(movieId: number, isAdding: boolean) {
    const userId = authStore.getValue().user?.id
    if (!userId) {
      return throwError(() => new Error('Requires user id'))
    }
    return this.api
      .post<WatchlistRequestApi, WatchlistResponseApi>({
        url: `account/${userId}/watchlist`,
        body: {
          media_type: 'movie',
          media_id: movieId,
          watchlist: isAdding
        }
      })
      .pipe(tap(() => this.watchlistUpdated$.next()))
  }

  getUserWatchlist() {
    // This uses the `this.watchlistUpdated$` stream to re-trigger fetch
    return combineLatest([
      authStore.pipe(select(state => state.user?.id)),
      this.watchlistUpdated$.pipe(startWith(null))
    ]).pipe(
      map(([userId]) => userId),
      filter(Boolean),
      switchMap(userId =>
        this.api.get<PagedApi<MovieSummaryApi>>({
          url: `account/${userId}/watchlist/movies`
        })
      ),
      map(
        (data): AsyncState<number[]> => ({
          isLoading: false,
          data: data.results.map(movie => movie.id)
        })
      ),
      startWith<AsyncState<number[]>>({ isLoading: true })
    )
  }
}
