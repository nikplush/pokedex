import {createReducer, on} from '@ngrx/store';
import {setItemsCount, setItemsPerPage, setPaginatorOptions} from "./paginator.actions";

export interface PaginatorState {
  page: number,
  itemsCount: number,
  itemsPerPage: number,
}

export interface PaginatorOptions {
  page?: number,
  itemsPerPage: number,
}

export const initialState = {page: 0, itemsCount: 0, itemsPerPage: 10};

const _counterReducer = createReducer(
  initialState,
  on(setPaginatorOptions, (state, payload: PaginatorOptions) => ({...state, page: payload?.page || 0, itemsPerPage: payload.itemsPerPage })),
  on(setItemsPerPage, (state: PaginatorState) => ({...state, itemsPerPage: 50})),
  on(setItemsCount, (state: PaginatorState, payload: { itemCount:number }) => ({...state, itemsCount: payload.itemCount}))
);

export function paginatorReducer(state: any, action: any) {
  return _counterReducer(state, action);
}
