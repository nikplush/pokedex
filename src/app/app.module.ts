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

@NgModule({
  declarations: [
    AppComponent,
    PokemonsComponent,
    PokemonComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        StoreModule.forRoot({}, {}),
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        MatCardModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
