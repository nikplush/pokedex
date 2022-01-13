import {createReducer, on} from '@ngrx/store';
import {addFavoritePokemon, removeFavoritePokemon} from "./favorites.actions";

export interface FavoritePokemon {
  name: string,
  url: string,
}

export const initialState: FavoritePokemon[] = [];

const _favoritesReducer = createReducer(
  initialState,
  on(addFavoritePokemon, (state, payload: FavoritePokemon) => [...state, {name: payload.name, url: payload.url}]),
  on(removeFavoritePokemon, (state, payload: FavoritePokemon) => state.filter((favorite:FavoritePokemon) => favorite.name !== payload.name)),
);

export function favoritesReducer(state: any, action: any) {
  return _favoritesReducer(state, action);
}
