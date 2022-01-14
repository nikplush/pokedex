export interface PokemonsFromApi {
  pokemons: Pokemon[],
}

export interface Pokemon {
  name: string,
  url: string,
}

export const initialState: Pokemon[] = [];
