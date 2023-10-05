export type Page<T> = {
  results: T[] | null

  info: {
    result: number
    count: number
    next: boolean | null
    pages: number
    prev: boolean | null
  }
}

export interface IApiError {
  message: string
  description: string
  statusCode: string | number
}
