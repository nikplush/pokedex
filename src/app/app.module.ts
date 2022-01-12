import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {paginatorReducer} from "./store/paginator/paginator.reducer";
import { EffectsModule } from '@ngrx/effects';
@NgModule({
  declarations: [
    AppComponent,
    PokemonsComponent,
    PokemonComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        StoreModule.forRoot({paginator: paginatorReducer}, {}),
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatPaginatorModule,
        EffectsModule.forRoot([])
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
