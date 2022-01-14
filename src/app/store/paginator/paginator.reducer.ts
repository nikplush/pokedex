import {createReducer, on} from '@ngrx/store';
import {setItemsCount, setItemsPerPage, setPaginatorOptions} from "./paginator.actions";
import {initialState, PaginatorOptions, PaginatorState} from "./paginator.model";

const _counterReducer = createReducer(
  initialState,
  on(setPaginatorOptions, (state, action: {payload: PaginatorOptions }) => ({...state, ...action.payload })),
  on(setItemsPerPage, (state: PaginatorState) => ({...state, itemsPerPage: 50})),
  on(setItemsCount, (state: PaginatorState, payload: { itemCount:number }) => ({...state, itemsCount: payload.itemCount}))
);

export function paginatorReducer(state: any, action: any) {
  return _counterReducer(state, action);
}
