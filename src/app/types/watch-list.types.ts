export type WatchListRequestApi = {
  media_type: 'movie' | 'tv'
  media_id: number
  watchlist: boolean
}

export type WatchListResponseApi = {
  status_code?: string
  status_message?: string
}
