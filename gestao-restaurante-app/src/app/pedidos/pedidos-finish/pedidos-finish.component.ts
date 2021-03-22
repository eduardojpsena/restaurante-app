import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/shared/services/pedidos.service';
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
  mesaSelecionada: boolean;
  valorTotal: number;
  pedidoSelecionado: Pedido;

  constructor(private pedidoService: PedidosService) {
    this.mesas = ["1", "2", "3", "4", "5"]
    this.pedidoSelecionado = new Pedido();
  }

  ngOnInit(): void {
    this.getAllPedidos();
  }

  getAllPedidos() {
    this.pedidoService
      .getPedidos()
      .subscribe((response) => this.pedidos = response);
  }

  consultarPedidos() {
    let mesaSelecionada = this.mesa;
    let pedidosEncontrados: Pedido[] = [];
    this.mesaSelecionada = true;
    this.pedidoService
      .getPedidos()
      .subscribe((response) => {
        this.pedidos.forEach(element => {
          if (mesaSelecionada == "0") {
            this.pedidos = response
          }
          if (mesaSelecionada == element.mesa) {
            pedidosEncontrados.push(element)
            this.pedidos = pedidosEncontrados
          }
        });
      });
  }

    finalizarPedidos() {
      let valorTotalTemp: number = 0;
      let valorTemp: number;
      this.pedidos.forEach(element => {
        valorTemp = +element.preco;
        valorTotalTemp += (element.quantidade) * (valorTemp)
        console.log(element)
        this.pedidoSelecionado = element;
        this.pedidoSelecionado.status = "Finalizado"
        this.pedidoService
            .atualizar(this.pedidoSelecionado)
            .subscribe((response: Pedido) => {
              this.pedidoSelecionado.status = response.status
            })
      });
      this.valorTotal = valorTotalTemp;
      
    }

  }
