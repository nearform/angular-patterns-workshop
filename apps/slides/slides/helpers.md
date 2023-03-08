<div class="dense">

# Some helpful utilities and types
- To save time, some utility functions and types have been included in `packages/utilities`, importable via `@app/utilities`
  - `tmdbPosterThumbnailUrl`:  generates a thumbnail image url from the image path returned from TMDB
  - `withWatchListFlag`: adds an `onWatchlist` boolean flag to a list of movies based on the supplied array of watchlist movie ids
- Type definitions are available for the TMDB API:
  - `MovieSummaryApi`: the type of the individual movies returned from the popular movies endpoint
  - `WatchlistRequestApi`/`WatchlistResponseApi`: request and response types for the watchlist post endpoint 
  - `PagedApi`: the general structure for TMDB responses that are lists of data (e.g. popular movies)
- These can be supplied to the API service as follows: `apiService.post<WatchlistRequestApi, WatchlistResponseApi>({...})` and `apiService.get<PagedApi<MovieSummaryApi>>('movies/popular')`
- Also included are some custom types that you may opt to use, including:
  - `MovieSummary`: a refined version of the API response
  - `AsyncState`: a simple type to indicate loading status 

</div>
