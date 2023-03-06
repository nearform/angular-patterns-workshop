import { MovieSummary, MovieSummaryWithWatchListFlag } from '../types';

/**
 * Adds an `onWatchlist` boolean to each movie in the list
 * Sets it to true if the movie is on the watchlist
 *
 * @param moviesList - the list of movie objects
 * @param watchlistIds - ids of movies on the watchlist
 */
export const withWatchlistFlag = (
  moviesList?: MovieSummary[],
  watchlistIds?: number[]
): MovieSummaryWithWatchListFlag[] =>
  moviesList && watchlistIds
    ? moviesList.map<MovieSummaryWithWatchListFlag>((movie) =>
        watchlistIds.some((watchlistMovieId) => watchlistMovieId === movie.id)
          ? { ...movie, onWatchlist: true }
          : { ...movie, onWatchlist: false }
      )
    : [];
