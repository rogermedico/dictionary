export interface SearchResult {
  query: {
    limit: number,
    page: string
  },
  results: {
    total: number,
    data: string[]
  }
}