import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {PaginatorState} from "./store/paginator/paginator.reducer";
import {PageEvent} from "@angular/material/paginator";
import {setPaginatorOptions} from "./store/paginator/paginator.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokedex';
  constructor(private store:Store<{paginator: PaginatorState}>) {
    this.paginator$ = store.select('paginator')
  }
  paginator$: Observable<PaginatorState>

  onChangePaginator(e: PageEvent): void{
    this.store.dispatch(setPaginatorOptions({itemsPerPage: e.pageSize, page: e.pageIndex}))
  }
}
