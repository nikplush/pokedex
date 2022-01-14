import {Component, OnDestroy, OnInit} from '@angular/core';
import {PokemonsService} from "../service/pokemons.service";
import {Observable, Subject} from "rxjs";
import {Store} from "@ngrx/store";
import {takeUntil} from "rxjs/operators";
import {PaginatorOptions} from "../store/paginator/paginator.model";
import {Pokemon} from "../store/pokemons/pokemons.model";

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  pokemons$: Observable<Pokemon[]>;
  startPokemon: number;
  endPokemon: number;

  constructor(private store:Store<{ paginator: PaginatorOptions, pokemons: Pokemon[] }>, public pokeService: PokemonsService) {
    this.pokemons$ = store.select('pokemons');
  }

  ngOnInit(): void {
    this.pokeService.getPokemons();
    this.store.select('paginator').pipe(takeUntil(this.destroy$))
      .subscribe(paginator => {
        this.startPokemon = (paginator?.page || 0) * (paginator?.itemsPerPage || 0);
        this.endPokemon = this.startPokemon + (paginator?.itemsPerPage || 0);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
