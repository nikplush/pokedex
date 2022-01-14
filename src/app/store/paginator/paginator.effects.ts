import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {mergeMap,concatMap} from 'rxjs/operators';
import {PokemonsService} from "../../service/pokemons.service";
import * as PaginatorActions from "./paginator.actions";
import {setPokemons} from "../pokemons/pokemos.actions";

@Injectable()
export class PokemonEffects {
  loadPokemons$ = createEffect(() => this.actions$.pipe(
      ofType(PaginatorActions.setPaginatorOptions),
      concatMap((action: any) => this.pokemonService.getPokemonsByPaginatorOptions(action).pipe(
          mergeMap((response) => {
            return [setPokemons({pokemons: response.results})]
          })
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private pokemonService: PokemonsService
  ) {
  }
}
