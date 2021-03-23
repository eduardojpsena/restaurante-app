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
  pedidosEncontrados: Pedido[] = [];

  constructor(
    private pedidoService: PedidosService
  ) {
    this.pedidoSelecionado = new Pedido();
    this.mesas = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]

  }

  ngOnInit(): void {
    this.pedidoService
      .getPedidos()
      .subscribe((response) => this.pedidos = response);
  }

  pesquisarPedidos() {
    this.pedidoService
        .getPedidos(this.mesa)
        .subscribe(response => this.pedidos = response)
  }

  preparaSelecao(pedido: Pedido) {
    this.pedidoSelecionado = pedido;
  }

  deletarPedido() {
    console.log(this.pedidoSelecionado)
    this.pedidoService
      .deletar(this.pedidoSelecionado)
      .subscribe(response => {
        SweetAlert.exibirSucesso('Sucesso', `Pedido "${this.pedidoSelecionado.item}" deletado com sucesso!`);
        this.ngOnInit();
      }, erroResponse => {
        SweetAlert.exibirErro('Erro', 'Erro ao deletar pedido!')
      })
  }

  concluirPedido() {
    this.pedidoSelecionado.status = "Concluido"
    this.pedidoService
      .atualizar(this.pedidoSelecionado)
      .subscribe((response: Pedido) => {
        this.pedidoSelecionado.status = response.status;
      })
  }

  cancelarPedido() {
    this.pedidoSelecionado.status = "Cancelado"
    this.pedidoService
      .atualizar(this.pedidoSelecionado)
      .subscribe((response: Pedido) => {
        this.pedidoSelecionado.status = response.status;
      })
  }

}
