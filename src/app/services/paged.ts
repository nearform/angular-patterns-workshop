export type PagedApi<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type Paged<T> = {
  page: number;
  results: T[];
  totalPages: number;
  totalResults: number;
};
