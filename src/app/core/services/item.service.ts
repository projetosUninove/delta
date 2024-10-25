import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../../types/item'; // Ajuste o caminho se necessário

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private baseUrl = 'http://localhost:8080/produto'; // Ajuste a URL conforme necessário

  constructor(private http: HttpClient) {}

  listar(): Observable<Item[]> {
    return this.http.get<Item[]>(this.baseUrl);
  }

  editar(produto: Item): Observable<Item> {
    const url = `${this.baseUrl}/${produto.id}`; // Supondo que 'id' é a chave do produto
    return this.http.put<Item>(url, produto, { headers: this.getHeaders() });
  }

  excluir(produtoId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/products/${produtoId}`);
  }
  
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
}
