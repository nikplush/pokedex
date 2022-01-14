export interface PaginatorState {
  page: number,
  itemsCount: number,
  itemsPerPage: number,
}

export interface PaginatorOptions {
  page?: number,
  itemsPerPage?: number,
  itemsCount?: number,
}

export const initialState: PaginatorState = {page: 0, itemsCount: 0, itemsPerPage: 10};
