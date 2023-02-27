import { MovieSummary } from '../types/movie-summary.types'

/**
 * Adds an `onWatchlist` boolean to each movie in the list
 * Sets it to true if the movie is on the watch list
 *
 * @param moviesList - the list of movie objects
 * @param watchlistIds - ids of movies on the watch list
 */
export const withWatchlistFlag = (
  moviesList?: MovieSummary[],
  watchlistIds?: number[]
) =>
  moviesList && watchlistIds
    ? moviesList.map<MovieSummary & { onWatchlist?: boolean }>(movie =>
        watchlistIds.some(watchListMovieId => watchListMovieId === movie.id)
          ? { ...movie, onWatchlist: true }
          : movie
      )
    : []
