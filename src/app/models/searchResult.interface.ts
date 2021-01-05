export interface SearchResult {
  query: {
    limit: number,
    page: number
  },
  results: {
    total: number,
    data: string[]
  }
}