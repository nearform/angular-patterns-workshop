import { Injectable } from '@angular/core';
import {
  PagedApi,
  MovieSummary,
  MovieSummaryApi,
  AsyncState,
} from '@app/utilities';
import { delay, map, startWith } from 'rxjs';
import { ApiService } from '../../app/services/api.service';
import { tmdbPosterThumbnailUrl } from '@app/utilities';

@Injectable({
  providedIn: 'root',
})
export class Movie06Service {
  constructor(private api: ApiService) {}

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
            poster: tmdbPosterThumbnailUrl(movie.poster_path),
          })),
        })
      ),
      // Simulate a slow network
      delay(5_000),
      // Set the initial state to loading
      startWith<AsyncState<MovieSummary[]>>({ isLoading: true })
    );
  }
}
