import {Component, Input, OnInit} from '@angular/core';
import axios from "axios";
import {PokemonsService} from "../service/pokemons.service";

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  @Input() pokemon: {
    name: string
    url: string
  } | null = null
  constructor(public pokeService: PokemonsService) { }

  pokemonInfo: any = null

  async getPokemonInfo(url: string): Promise<void> {
    const fetchedPokeInfo = await axios(url)
    this.pokemonInfo = fetchedPokeInfo.data
  }

  ngOnInit(): void {
    if (this.pokemon?.url) {
      this.getPokemonInfo(this.pokemon.url)
    }
  }
}
