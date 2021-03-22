import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosFormComponent } from './pedidos-form/pedidos-form.component';
import { PedidosListaComponent } from './pedidos-lista/pedidos-lista.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PedidosFormComponent, 
    PedidosListaComponent
  ],
  imports: [
    CommonModule,
    PedidosRoutingModule,
    FormsModule
  ],
  exports: [
    PedidosFormComponent,
    PedidosListaComponent
  ]
})
export class PedidosModule { }
