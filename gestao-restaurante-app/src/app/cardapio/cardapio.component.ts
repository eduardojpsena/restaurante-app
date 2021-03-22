import { Component, OnInit } from '@angular/core';
import { CardapioService } from '../shared/services/cardapio.service';
import { SweetAlert } from '../shared/sweet-alert';
import { Cardapio } from './cardapio';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css']
})
export class CardapioComponent implements OnInit {

  cardapio: Cardapio[] = [];
  itemSelecionado: Cardapio;

  constructor(private cardapioService: CardapioService) { }

  ngOnInit(): void {
    this.cardapioService
      .getCardapio()
      .subscribe(response => this.cardapio = response)
  }

  preparaSelecao(item: Cardapio) {
    this.itemSelecionado = item;

  }

  deletarPedido() {
    this.cardapioService
      .deletar(this.itemSelecionado)
      .subscribe(response => {
        SweetAlert.exibirSucesso('Sucesso', `Pedido "${this.itemSelecionado.nome}" deletado com sucesso!`);
        this.ngOnInit();
      }, erroResponse => {
        SweetAlert.exibirErro('Erro', 'Erro ao deletar pedido!')
      })
  }
}
