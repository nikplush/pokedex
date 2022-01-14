import {Component, ElementRef, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {setPaginatorOptions} from "./store/paginator/paginator.actions";
import {PokemonsService} from "./service/pokemons.service";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {FormControl} from "@angular/forms";
import {PaginatorState} from "./store/paginator/paginator.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  @ViewChild('typeInput') typeInput: ElementRef<HTMLInputElement>;
  title = 'pokedex';
  pokeCtrl = new FormControl();

  constructor(private store: Store<{ paginator: PaginatorState }>, public pokeService: PokemonsService) {
    this.paginator$ = store.select('paginator');
  }

  paginator$: Observable<PaginatorState>;

  selected(event: MatAutocompleteSelectedEvent): void {
    this.pokeService.addType(event.option.viewValue);
    this.typeInput.nativeElement.value = '';
    this.pokeCtrl.setValue(null);
  }

  onChangePaginator(e: PageEvent): void {
    this.store.dispatch(setPaginatorOptions({payload: {itemsPerPage: e.pageSize, page: e.pageIndex}}));
  }
}
