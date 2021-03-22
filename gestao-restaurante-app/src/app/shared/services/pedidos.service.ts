import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Pedido } from '../../pedidos/pedido';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  apiUrl: string = environment.apiURLBase + '/api/pedidos'

  constructor( private http: HttpClient) {}

  salvar( pedido: Pedido ): Observable<Pedido> {
    pedido.status = "Novo"
    return this.http.post<Pedido>(this.apiUrl, pedido);
  }

  atualizar( pedido: Pedido ): Observable<any> {
    return this.http.put<Pedido>(`${this.apiUrl}/${pedido.id}`, pedido);
  }

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  getPedidoById( id: number ): Observable<Pedido> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  deletar( pedido: Pedido ): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${pedido.id}`)
  }
}
