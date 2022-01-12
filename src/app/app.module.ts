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
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { FavoriteComponent } from './favorite/favorite.component';
import { AllPokemonsComponent } from './all-pokemons/all-pokemons.component';
@NgModule({
  declarations: [
    AppComponent,
    PokemonsComponent,
    PokemonComponent,
    FavoriteComponent,
    AllPokemonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({paginator: paginatorReducer}, {}),
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatPaginatorModule,
    EffectsModule.forRoot([]),
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
