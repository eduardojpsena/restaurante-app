import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { CardapioService } from 'src/app/shared/services/cardapio.service';
import { SweetAlert } from 'src/app/shared/sweet-alert';
import { Cardapio } from '../cardapio';

@Component({
  selector: 'app-cardapio-form',
  templateUrl: './cardapio-form.component.html',
  styleUrls: ['./cardapio-form.component.css']
})
export class CardapioFormComponent implements OnInit {

  cardapio: Cardapio;
  success: boolean = false;
  errors!: String[];
  id: number;

  constructor(
    private cardapioService: CardapioService,
    private activatedRoute: ActivatedRoute
  ) {
    this.cardapio = new Cardapio();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    params.subscribe(urlParams => {
      this.id = urlParams['id'];
      if (this.id) {
        this.cardapioService.getItemById(this.id)
          .subscribe(
            response => this.cardapio = response,
            errorResponse => this.cardapio = new Cardapio()
          )
      }
    });
  }

  onSubmit() {
    if (this.id) {
      this.cardapioService.atualizar(this.cardapio)
        .subscribe((response: Cardapio) => {
          this.success = true;
          this.errors = [];
          SweetAlert.exibirSucesso('Sucesso', `Item "${response.nome}" atualizado com sucesso!`)
        }, (erroResponse) => {
          SweetAlert.exibirErro('Erro', `Erro ao atualizar pedido`)
        })
    } else {
      this.cardapioService
      .salvar(this.cardapio)
      .subscribe((response: Cardapio) => {
        this.success = true;
        this.errors = [];
        SweetAlert.exibirSucesso('Sucesso', `Item "${response.nome}" salvo com sucesso!`)
      }, errorResponse => {
        this.success = false;
        SweetAlert.exibirErro('Erro', `${errorResponse.error.errors}`)
      })
    }
    

  }
}
