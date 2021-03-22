import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardapioFormComponent } from './cardapio/cardapio-form/cardapio-form.component';
import { CardapioComponent } from './cardapio/cardapio.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', component: HomeComponent },
  { path: 'cardapio', component: CardapioComponent},
  { path: 'cardapio-form', component: CardapioFormComponent},
  { path: 'cardapio-form/:id', component: CardapioFormComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
