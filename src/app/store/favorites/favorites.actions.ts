import {createAction, props} from '@ngrx/store';

export const addFavoritePokemon = createAction('[Favorites] Add favorite pokemon', props<any>());
export const removeFavoritePokemon = createAction('[Favorites] remove favorite pokemon', props<any>());
