import { Injectable } from '@angular/core'
import {
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  Subject,
  switchMap,
  tap,
  throwError
} from 'rxjs'
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
import { AuthService } from '../../app/services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class Movie10Service {
  // Triggered after an update to the watch list and used to re-trigger watch list query
  private watchlistUpdated$ = new Subject<void>()

  constructor(private api: ApiService, private authService: AuthService) {}

  // See https://developers.themoviedb.org/3/movies/get-popular-movies
  getPopular() {
    return this.api.get<PagedApi<MovieSummaryApi>>('movie/popular').pipe(
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
    const userId = this.authService.currentUser()?.id
    if (!userId) {
      return throwError(() => new Error('Requires user id'))
    }
    return this.api
      .post<WatchlistRequestApi, WatchlistResponseApi>({
        path: `account/${userId}/watchlist`,
        body: {
          media_type: 'movie',
          media_id: movieId,
          watchlist: isAdding
        }
      })
      .pipe(tap(() => this.watchlistUpdated$.next()))
  }

  // See https://developers.themoviedb.org/3/account/get-movie-watchlist
  getUserWatchlist() {
    // This uses the `this.watchlistUpdated$` stream to re-trigger fetch
    return combineLatest([
      this.authService.state$.pipe(
        map(state => state.user?.id),
        distinctUntilChanged()
      ),
      this.watchlistUpdated$.pipe(startWith(null))
    ]).pipe(
      map(([userId]) => userId),
      filter(Boolean),
      switchMap(userId =>
        this.api.get<PagedApi<MovieSummaryApi>>(
          `account/${userId}/watchlist/movies`
        )
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
