export interface Pagination {
  currentPage: number
  perPage: number
  total: number
  totalPage: number
}

export interface ApiResponse<T> {
  data: T
  status: string
  pagination: Pagination
}
