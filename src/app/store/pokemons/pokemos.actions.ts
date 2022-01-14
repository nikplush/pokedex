import {createAction, props} from '@ngrx/store';

export const setPokemons = createAction('[Pokemons] Set pokemons', props<{pokemons: { name: string, url: string }[] }>());
