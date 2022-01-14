import {Action, createReducer, on} from '@ngrx/store';
import {setPokemons} from "./pokemos.actions";
import {initialState, Pokemon, PokemonsFromApi} from "./pokemons.model";

const _counterReducer = createReducer(
  initialState,
  on(setPokemons, (state, payload: PokemonsFromApi) =>  payload.pokemons),
);

export function pokemonReducer(state: any, action: Action) {
  return _counterReducer(state, action);
}
