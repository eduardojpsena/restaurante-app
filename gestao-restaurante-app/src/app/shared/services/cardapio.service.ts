import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cardapio } from 'src/app/cardapio/cardapio';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardapioService {

  apiUrl: string = environment.apiURLBase + '/api/itens'

  constructor( private http: HttpClient ) { }

  salvar( item: Cardapio ): Observable<Cardapio> {
    return this.http.post<Cardapio>(this.apiUrl, item);
  }

  getCardapio(): Observable<Cardapio[]> {
    return this.http.get<Cardapio[]>(this.apiUrl);
  }

  getItemById( id: number ): Observable<Cardapio> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  atualizar( item: Cardapio ): Observable<any> {
    return this.http.put<Cardapio>(`${this.apiUrl}/${item.id}`, item);
  }
  
  deletar( item: Cardapio ): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${item.id}`)
  }
}
