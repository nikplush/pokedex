import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import axios from "axios";
import {Store} from "@ngrx/store";
import {PaginatorState} from "../store/paginator/paginator.reducer";
import {setItemsCount} from "../store/paginator/paginator.actions";

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
  pokemons = new BehaviorSubject<any[]>([])
  constructor(private store:Store<{paginator: PaginatorState}>) {
    this.paginator$ = store.select('paginator')
  }
  paginator$: Observable<PaginatorState>

  getPokemons (): void {
    this.paginator$.subscribe(async (item) => {
      const { data } = await axios(`https://pokeapi.co/api/v2/pokemon?limit=${item.itemsPerPage}&offset=${item.itemsPerPage * item.page}`)
      this.pokemons.next(data.results)
    })
    this.getAllCountPokemons()
  }

  async getAllCountPokemons (): Promise<void> {
    const { data } = await axios('https://pokeapi.co/api/v2/pokemon')
    this.store.dispatch(setItemsCount({itemCount: data.count}))
  }
}
