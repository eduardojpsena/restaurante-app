import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Cardapio } from 'src/app/cardapio/cardapio';
import { CardapioService } from 'src/app/shared/services/cardapio.service';
import { PedidosService } from 'src/app/shared/services/pedidos.service';
import { SweetAlert } from 'src/app/shared/sweet-alert';
import { Pedido } from '../pedido';

@Component({
  selector: 'app-pedidos-form',
  templateUrl: './pedidos-form.component.html',
  styleUrls: ['./pedidos-form.component.css']
})
export class PedidosFormComponent implements OnInit {

  pedido: Pedido;
  success: boolean = false;
  errors!: String[];
  mesa: string;
  mesas: string[];
  id: number;
  cardapio: Cardapio[];
  valor: string;

  constructor(
    private pedidoService: PedidosService,
    private cardapioService: CardapioService,
    private activatedRoute: ActivatedRoute
  ) {
    this.mesas = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    this.pedido = new Pedido();
  }

  pegarValor(valor: string){
    this.cardapio.forEach(element => {
      if (element.nome == valor) {
        this.pedido.preco = element.preco
      } if (valor == "0") {
        this.pedido.preco = ""
      }
    });
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if (this.id) {
        this.pedidoService.getPedidoById(this.id)
          .subscribe(
            response => this.pedido = response,
            errorResponse => this.pedido = new Pedido()
          )
      }
    });
    this.cardapioService
      .getCardapio()
      .subscribe(response => this.cardapio = response)
    
  }

  onSubmit() {
    console.log(this.pedido.item)

    if (this.id) {
      this.pedidoService.atualizar(this.pedido)
        .subscribe((response: Pedido) => {
          this.success = true;
          this.errors = [];
          this.pedido.status = response.status;
          SweetAlert.exibirSucesso('Sucesso', `Item "${response.item}" atualizado com sucesso!`)
        }, (erroResponse) => {
          SweetAlert.exibirErro('Erro', `Erro ao atualizar pedido`)
        })
    } else {
      this.pedidoService
        .salvar(this.pedido)
        .subscribe((response: Pedido) => {
          this.success = true;
          this.errors = [];
          SweetAlert.exibirSucesso('Sucesso', `Item "${response.item}" salvo com sucesso!`)
          this.pedido = new Pedido();
        }, (errorResponse) => {
          this.success = false;
          SweetAlert.exibirErro('Erro', `${errorResponse.error.errors}`)
        })
    }
  }
}
