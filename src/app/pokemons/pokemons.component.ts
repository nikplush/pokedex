import { Component, OnInit } from '@angular/core';
import {PokemonsService} from "../service/pokemons.service";

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {

  constructor(public pokeService: PokemonsService) { }

  ngOnInit(): void {
    this.pokeService.getPokemons()
  }

}
