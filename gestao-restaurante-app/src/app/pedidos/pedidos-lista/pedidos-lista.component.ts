import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/shared/services/pedidos.service';
import { SweetAlert } from 'src/app/shared/sweet-alert';
import { Pedido } from '../pedido';

@Component({
  selector: 'app-pedidos-lista',
  templateUrl: './pedidos-lista.component.html',
  styleUrls: ['./pedidos-lista.component.css']
})
export class PedidosListaComponent implements OnInit {

  pedidos: Pedido[] = [];
  pedidoSelecionado: Pedido;
  mesa: string;
  mesas: string[];
  mesasEncontradas: string[] = [];
  
  constructor( 
    private pedidoService: PedidosService 
    ) { 
      this.pedidoSelecionado = new Pedido();
      this.mesas = ["1","2","3","4","5"]
      
    }

  ngOnInit(): void {
    this.pedidoService
        .getPedidos()
        .subscribe( (response) => this.pedidos = response);
  }

  preparaSelecao( pedido: Pedido ) {
    this.pedidoSelecionado = pedido;
    
  }

  // deletarPedido( ) {
  //   this.pedidoService
  //       .deletar(this.pedidoSelecionado)
  //       .subscribe( response => {
  //         SweetAlert.exibirSucesso('Sucesso', `Pedido "${this.pedidoSelecionado.item}" deletado com sucesso!`);
  //       }, erroResponse => {
  //         SweetAlert.exibirErro('Erro', 'Erro ao deletar pedido!')
  //       })
  // }

  concluirPedido() {
    this.pedidoSelecionado.status = "Concluido"
    this.pedidoService
          .atualizar(this.pedidoSelecionado)
          .subscribe( (response: Pedido) => {
            this.pedidoSelecionado.status = response.status;
          })
  }

  cancelarPedido() {
    this.pedidoSelecionado.status = "Cancelado"
    this.pedidoService
          .atualizar(this.pedidoSelecionado)
          .subscribe( (response: Pedido) => {
            this.pedidoSelecionado.status = response.status;
          })
  }

  consultarPedido() {
    let mesasEncontradas: string[] = [];
    for (let index = 0; index < this.pedidos.length; index++) {
      const element = this.pedidos[index].mesa;
      if (!mesasEncontradas.includes(element)) {
        mesasEncontradas.push(element)
      } 
    }
    return mesasEncontradas;
  }
}