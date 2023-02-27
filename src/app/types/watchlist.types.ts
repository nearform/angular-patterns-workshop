export type WatchlistRequestApi = {
  media_type: 'movie' | 'tv'
  media_id: number
  watchlist: boolean
}

export type WatchlistResponseApi = {
  status_code?: string
  status_message?: string
}
