import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidosFormComponent } from './pedidos-form/pedidos-form.component';
import { PedidosListaComponent } from './pedidos-lista/pedidos-lista.component';

const routes: Routes = [
  { path: 'pedidos-novo', component: PedidosFormComponent },
  { path: 'pedidos-novo/:id', component: PedidosFormComponent },
  { path: 'pedidos-lista', component: PedidosListaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
