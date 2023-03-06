import { Injectable } from '@angular/core';
import { PagedApi } from '../../app/types/paged.types';
import {
  MovieSummary,
  MovieSummaryApi,
} from '../../app/types/movie-summary.types';
import { map } from 'rxjs';
import { ApiService } from '../../app/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class Movie04Service {
  constructor(private api: ApiService) {}

  // See https://developers.themoviedb.org/3/movies/get-popular-movies
  getPopular() {
    return this.api.get<PagedApi<MovieSummaryApi>>('movie/popular').pipe(
      map((data): MovieSummary[] =>
        data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
        }))
      )
    );
  }
}
