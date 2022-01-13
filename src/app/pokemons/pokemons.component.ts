import {Component, OnDestroy, OnInit} from '@angular/core';
import {PokemonsService} from "../service/pokemons.service";
import {Subject} from "rxjs";
import {PaginatorOptions} from "../store/paginator/paginator.reducer";
import {Store} from "@ngrx/store";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();
  startPokemon: number
  endPokemon: number

  constructor(private store:Store<{ paginator: PaginatorOptions }>, public pokeService: PokemonsService) {}

  ngOnInit(): void {
    this.pokeService.getPokemons()
    this.store.select('paginator').pipe(takeUntil(this.destroy$))
      .subscribe(paginator => {
        this.startPokemon = (paginator.page || 0) * paginator.itemsPerPage
        this.endPokemon = this.startPokemon + paginator.itemsPerPage
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
  }
}
