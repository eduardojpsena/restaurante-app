import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidosFinishComponent } from './pedidos-finish/pedidos-finish.component';
import { PedidosFormComponent } from './pedidos-form/pedidos-form.component';
import { PedidosListaComponent } from './pedidos-lista/pedidos-lista.component';

const routes: Routes = [
  { path: 'pedidos-novo', component: PedidosFormComponent },
  { path: 'pedidos-novo/:id', component: PedidosFormComponent },
  { path: 'pedidos-lista', component: PedidosListaComponent},
  { path: 'pedidos-finish', component: PedidosFinishComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
