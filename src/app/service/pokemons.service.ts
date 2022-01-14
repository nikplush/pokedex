import {Injectable} from '@angular/core';
import {BehaviorSubject, interval, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {setItemsCount, setPaginatorOptions} from "../store/paginator/paginator.actions";
import {HttpClient} from "@angular/common/http";
import {debounce, map} from "rxjs/operators";
import {setPokemons} from "../store/pokemons/pokemos.actions";
import {PaginatorState} from "../store/paginator/paginator.model";

interface Pokemon {
  name: string,
  id: number,
}

interface Pokemons {
  results: Pokemon[],
  count: number,
}

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
  pokemons = new BehaviorSubject<any[]>([]);
  types = new BehaviorSubject<string[]>([]);
  allTypes: string[] = [];

  constructor(
    private store: Store<{ paginator: PaginatorState }>,
    private http: HttpClient,
  ) {
    this.paginator$ = store.select('paginator');
  }

  paginator$: Observable<PaginatorState>

  public async getPokemons(): Promise<void> {
    this.getAllTypes();
    this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`)
      .subscribe((item: any) => {this.store.dispatch( setPokemons({pokemons: item.results}))});
  }

  public getPokemonsByPaginatorOptions(paginationOptions: { payload: { itemsPerPage: number, page: number } }): Observable<any> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${paginationOptions.payload.itemsPerPage}&offset=${paginationOptions.payload.itemsPerPage * paginationOptions.payload.page}`);
  }

  private getPokemonsByTypes(types: string[]): void {
    let pokemons: { name: string, url: string }[] = [];
    if (types.length)
      types.forEach((type: string) => {
        this.http.get(`https://pokeapi.co/api/v2/type/${type}`).pipe(
          map((item: any) => {
            const transformedData = item.pokemon.map((pokemonsByType: {pokemon: Pokemon}) => pokemonsByType.pokemon);
            if (!pokemons.length) {
              pokemons = transformedData;
            } else {
              pokemons = transformedData.filter((pokemon: any) => pokemons.some((newPokemon: any) => newPokemon.name === pokemon.name));
            }
            return pokemons;
          }),
        ).subscribe(item => {
          this.pokemons.next(item);
          this.store.dispatch(setPaginatorOptions({payload: {itemsCount: item.length, page: 0}}));
        })
      })
  }

  public addType(type: string): void {
    const currentTypes = this.types.getValue();
    if (!currentTypes.includes(type)) {
      currentTypes.push(type);
      this.getPokemonsByTypes(currentTypes);
      this.types.next(currentTypes);
    }
  }

  public removeType(type: string): void {
    const currentTypes = this.types.getValue();
    this.getPokemonsByTypes(currentTypes);
    this.types.next(currentTypes.filter(item => item !== type));
  }

  private async getAllTypes(): Promise<void> {
    this.http.get('https://pokeapi.co/api/v2/type').subscribe((item: any) => {
      this.allTypes = item.results.map((type: any) => type.name);
    })
  }
}
