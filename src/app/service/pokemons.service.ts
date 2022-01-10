import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {
  pokemons = new BehaviorSubject<any[]>([])
  constructor() { }

  async getPokemons (): Promise<void> {
    const { data } = await axios('https://pokeapi.co/api/v2/pokemon?limit=100')
    this.pokemons.next(data.results)
  }
}
