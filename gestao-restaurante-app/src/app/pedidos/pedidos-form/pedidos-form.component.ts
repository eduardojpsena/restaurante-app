import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
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
  id: number;

  constructor( 
    private pedidoService: PedidosService,
    private activatedRoute: ActivatedRoute 
    ) { 
    this.pedido = new Pedido();
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
  }

  onSubmit() {
    if (this.id) {
      this.pedidoService.atualizar(this.pedido)
          .subscribe( (response: Pedido) => {
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
      .subscribe( (response: Pedido) => {
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
