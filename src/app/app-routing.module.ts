import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FavoriteComponent} from "./favorite/favorite.component";
import {PokemonsComponent} from "./pokemons/pokemons.component";

const routes: Routes = [
  { path: 'all', component: PokemonsComponent },
  { path: 'favorite', component: FavoriteComponent},
  { path: '**', redirectTo: '/treads'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
