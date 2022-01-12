import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {FavoriteComponent} from "./favorite/favorite.component";

const routes: Routes = [
  { path: 'all', component: AppComponent },
  { path: 'favorite', component: FavoriteComponent},
  { path: '**', redirectTo: '/treads'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
