import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosFormComponent } from './pedidos-form/pedidos-form.component';
import { PedidosListaComponent } from './pedidos-lista/pedidos-lista.component';
import { FormsModule } from '@angular/forms';
import { PedidosFinishComponent } from './pedidos-finish/pedidos-finish.component';


@NgModule({
  declarations: [
    PedidosFormComponent, 
    PedidosListaComponent, 
    PedidosFinishComponent,
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    FormsModule
  ],
  exports: [
    PedidosFormComponent,
    PedidosListaComponent,
    PedidosFinishComponent
  ]
})
export class PedidosModule { }
