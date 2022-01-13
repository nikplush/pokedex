import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {PaginatorState} from "../store/paginator/paginator.reducer";
import {PokemonsService} from "../service/pokemons.service";
import {Observable} from "rxjs";
import {FavoritePokemon} from "../store/favorites/favorites.reducer";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit, OnDestroy {
  favorites$: Observable<FavoritePokemon[]>;
  paginator$: Observable<PaginatorState>;

  constructor(private store:Store<{favorites: FavoritePokemon[], paginator: PaginatorState}>) {
    this.favorites$ = store.select('favorites');
    this.paginator$ = store.select('paginator');
  }


  ngOnInit(): void {

  }


  ngOnDestroy(): void {

  }
}
