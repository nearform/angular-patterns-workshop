import { Injectable } from '@angular/core'
import { ApiService } from './api.service'
import { Paged, PagedApi } from './paged'
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
import { authStore } from './auth.service'
import { select } from '@ngneat/elf'

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

type WatchListRequest = {
  media_type: 'movie' | 'tv'
  media_id: number
  watchlist: boolean
}

type WatchListResponse = {
  status_code?: string
  status_message?: string
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  // Triggered after an update to the watch list and used to re-trigger watch list query
  private watchListUpdated$ = new Subject<void>()

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

  postWatchlist(movieId: number, isAdding: boolean) {
    const userId = authStore.getValue().user?.id
    if (!userId) {
      return throwError(() => new Error('Requires user id'))
    }
    return this.api
      .post<WatchListRequest, WatchListResponse>({
        url: `account/${userId}/watchlist`,
        body: {
          media_type: 'movie',
          media_id: movieId,
          watchlist: isAdding
        }
      })
      .pipe(tap(() => this.watchListUpdated$.next()))
  }

  getUserWatchList() {
    // This uses the `this.watchListUpdated$` stream to re-trigger fetch
    return combineLatest([
      authStore.pipe(select(state => state.user?.id)),
      this.watchListUpdated$.pipe(startWith(null))
    ]).pipe(
      map(([userId]) => userId),
      filter(Boolean),
      switchMap(userId =>
        this.api.get<PagedApi<MovieSummaryApi>>({
          url: `account/${userId}/watchlist/movies`
        })
      ),
      map(data => ({
        page: data.page,
        totalPages: data.total_pages,
        results: data.results.map(movie => movie.id),
        totalResults: data.total_results
      }))
    )
  }
}
