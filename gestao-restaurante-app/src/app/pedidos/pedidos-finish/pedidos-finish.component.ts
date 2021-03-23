import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/shared/services/pedidos.service';
import { SweetAlert } from 'src/app/shared/sweet-alert';
import { Pedido } from '../pedido';
import { PedidosListaComponent } from '../pedidos-lista/pedidos-lista.component';

@Component({
  selector: 'app-pedidos-finish',
  templateUrl: './pedidos-finish.component.html',
  styleUrls: ['./pedidos-finish.component.css']
})
export class PedidosFinishComponent implements OnInit {

  pedidos: Pedido[] = [];
  mesa: string;
  mesas: string[];
  valorTotal: number;
  pedidoSelecionado: Pedido;

  constructor(private pedidoService: PedidosService) {
    this.mesas = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    this.pedidoSelecionado = new Pedido();
  }

  ngOnInit(): void {
    this.pedidoService
      .getPedidos()
      .subscribe(response => this.pedidos = response)
  }

  pesquisarPedidos() {
    this.pedidoService
      .getPedidos(this.mesa)
      .subscribe(response => this.pedidos = response)
  }

  finalizarPedidos() {
    let valorTotalTemp: number = 0;
    let valorTemp: number;
    this.pedidos.forEach(element => {
      valorTemp = +element.preco;
      valorTotalTemp += (element.quantidade) * (valorTemp)
      this.pedidoSelecionado = element;
      this.pedidoSelecionado.status = "Finalizado"
      this.pedidoService
        .atualizar(this.pedidoSelecionado)
        .subscribe((response: Pedido) => {
          this.pedidoSelecionado.status = response.status
        })
    });
    this.valorTotal = valorTotalTemp;
    SweetAlert.exibirSucesso('Sucesso', `Valor total: R$ ${this.valorTotal}`)
  }

  preparaFinalizacao() {
    return null
  }
}
