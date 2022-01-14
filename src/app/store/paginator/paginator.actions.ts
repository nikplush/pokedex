import {createAction, props} from '@ngrx/store';
import {PaginatorOptions} from "./paginator.model";

export const setPaginatorOptions = createAction('[Paginator] Set paginator options', props<{ payload: PaginatorOptions}>());
export const setItemsPerPage = createAction('[Paginator] Set items per page');
export const setItemsCount = createAction('[Paginator] Past page', props<{ itemCount: number }>());
