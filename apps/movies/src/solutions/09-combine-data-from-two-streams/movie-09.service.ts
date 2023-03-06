import { Injectable } from '@angular/core';
import {
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
  throwError,
} from 'rxjs';
import { AuthService } from '../../app/services/auth.service';
import { ApiService } from '../../app/services/api.service';
import {
  PagedApi,
  MovieSummary,
  MovieSummaryApi,
  AsyncState,
  WatchlistRequestApi,
  WatchlistResponseApi,
} from '@app/utilities';

@Injectable({
  providedIn: 'root',
})
export class Movie09Service {
  constructor(private api: ApiService, private authService: AuthService) {}

  // See https://developers.themoviedb.org/3/movies/get-popular-movies
  getPopular() {
    return this.api.get<PagedApi<MovieSummaryApi>>('movie/popular').pipe(
      map(
        (data): AsyncState<MovieSummary[]> => ({
          isLoading: false,
          data: data.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            overview: movie.overview,
            poster: `https://image.tmdb.org/t/p/w92/${movie.poster_path}`,
          })),
        })
      ),
      startWith<AsyncState<MovieSummary[]>>({ isLoading: true })
    );
  }

  // See https://developers.themoviedb.org/3/account/add-to-watchlist
  postWatchlist(movieId: number, isAdding: boolean) {
    const userId = this.authService.currentUser()?.id;
    if (!userId) {
      return throwError(() => new Error('Requires user id'));
    }
    return this.api.post<WatchlistRequestApi, WatchlistResponseApi>({
      path: `account/${userId}/watchlist`,
      body: {
        media_type: 'movie',
        media_id: movieId,
        watchlist: isAdding,
      },
    });
  }

  // See https://developers.themoviedb.org/3/account/get-movie-watchlist
  getUserWatchlist() {
    return this.authService.state$.pipe(
      map((state) => state.user?.id),
      distinctUntilChanged(),
      filter(Boolean),
      switchMap((userId) =>
        this.api.get<PagedApi<MovieSummaryApi>>(
          `account/${userId}/watchlist/movies`
        )
      ),
      map(
        (data): AsyncState<number[]> => ({
          isLoading: false,
          data: data.results.map((movie) => movie.id),
        })
      ),
      startWith<AsyncState<number[]>>({ isLoading: true })
    );
  }
}
