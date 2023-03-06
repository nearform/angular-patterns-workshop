import { Injectable } from '@angular/core';
import { PagedApi, MovieSummary, MovieSummaryApi } from '@app/utilities';
import { map } from 'rxjs';
import { ApiService } from '../../app/services/api.service';
import { tmdbPosterThumbnailUrl } from '@app/utilities';

@Injectable({
  providedIn: 'root',
})
export class Movie05Service {
  constructor(private api: ApiService) {}

  // See https://developers.themoviedb.org/3/movies/get-popular-movies
  getPopular() {
    return this.api.get<PagedApi<MovieSummaryApi>>('movie/popular').pipe(
      map((data): MovieSummary[] =>
        data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          poster: tmdbPosterThumbnailUrl(movie.poster_path),
        }))
      )
    );
  }
}
