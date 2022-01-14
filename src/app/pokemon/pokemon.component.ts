import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import axios from "axios";
import {PokemonsService} from "../service/pokemons.service";
import {Store} from "@ngrx/store";

import {Subject} from "rxjs";
import {FavoritePokemon} from "../store/favorites/favorites.reducer";
import {takeUntil} from "rxjs/operators";
import {addFavoritePokemon, removeFavoritePokemon} from "../store/favorites/favorites.actions";
import {PaginatorOptions} from "../store/paginator/paginator.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit, OnDestroy {
  @Input() pokemon: {
    name: string,
    url: string,
  }
  destroy$ = new Subject<boolean>();
  isFavorite = false;
  pokemonInfo: any;
  paginator: PaginatorOptions;

  constructor(
    private store:Store<{favorites: FavoritePokemon[], paginator: PaginatorOptions }>,
    public pokeService: PokemonsService,
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    if (this.pokemon?.url) {
      this.getPokemonInfo(this.pokemon.url);
    }
    this.store.select('favorites').pipe(takeUntil(this.destroy$))
      .subscribe(favorites => this.isFavorite = favorites.some(favoritePokemon => favoritePokemon.name === this.pokemon.name));
    this.store.select('paginator').pipe(takeUntil(this.destroy$))
      .subscribe(paginator => this.paginator = paginator);
  }

  public processStarClick(): void {
    if (this.isFavorite) {
      this.store.dispatch(removeFavoritePokemon(this.pokemon));
    } else {
      this.store.dispatch(addFavoritePokemon(this.pokemon));
    }
  }

  private getPokemonInfo(url: string): void {
    this.http.get(url).subscribe( pokeInfo => this.pokemonInfo = pokeInfo);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
