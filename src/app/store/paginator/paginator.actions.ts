import {createAction, props} from '@ngrx/store';
import {PaginatorOptions} from "./paginator.reducer";

export const setPaginatorOptions = createAction('[Paginator] Set paginator options', props<PaginatorOptions>());
export const setItemsPerPage = createAction('[Paginator] Set items per page');
export const setItemsCount = createAction('[Paginator] Past page', props<{ itemCount: number }>());
