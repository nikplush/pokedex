import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {PaginatorState} from "../store/paginator/paginator.reducer";
import {setItemsCount} from "../store/paginator/paginator.actions";
import {HttpClient} from "@angular/common/http";

interface Pokemon {
  name: string,
  id: number
}

interface Pokemons {
  results: Pokemon[],
  count: number
}

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
  pokemons = new BehaviorSubject<any[]>([]);
  types = new BehaviorSubject<string[]>([]);
  allTypes: string[] = []
  constructor(
    private store:Store<{paginator: PaginatorState}>,
    private http: HttpClient
  ) {
    this.paginator$ = store.select('paginator')
  }
  paginator$: Observable<PaginatorState>

  async getPokemons (): Promise<void> {
    this.getAllCountPokemons()
    this.getAllTypes()
    this.paginator$.subscribe(async (item) => {
      this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${item.itemsPerPage}&offset=${item.itemsPerPage * item.page}`)
        .subscribe((item:any) => {
        this.pokemons.next(item.results)
      })
    })
  }

  async getAllCountPokemons (): Promise<void> {
    this.http.get('https://pokeapi.co/api/v2/pokemon').subscribe((item:any) => {
      this.store.dispatch(setItemsCount({itemCount: item.count}))
    })
  }

  addType(type: string):void {
    const currentTypes = this.types.getValue()
    if (!currentTypes.includes(type)){
      currentTypes.push(type)
      this.types.next(currentTypes)
    }
  }
  removeType(type: string):void {
    const currentTypes = this.types.getValue()
      this.types.next(currentTypes.filter(item => item !== type))
  }

  private async getAllTypes(): Promise<void> {
    this.http.get('https://pokeapi.co/api/v2/type').subscribe((item:any) => {
      this.allTypes = item.results.map((type: any )=> type.name)
    })
  }
}
