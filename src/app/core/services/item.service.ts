import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, lastValueFrom, catchError, tap, of } from 'rxjs';
import { Item } from '../../types/item'; // Ajuste o caminho se necessário
import { environment } from '../../../environments/environment';

export interface CarrinhoDto {
  produtoId: number;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private baseUrl = environment.baseUrl;
  private headers: HttpHeaders;
  public usuarioId: number | null = null;
  constructor(private http: HttpClient) {
    this.headers = this.getHeaders();
    this.obterUsuarioId().then(() => console.log('ID do usuário obtido com sucesso'));
  }

  async obterUsuarioId(): Promise<void> {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token de autenticação não encontrado.');

      const response = await lastValueFrom(
        this.http.get<{ id: number }>(`${this.baseUrl}/usuario/user-id`, { headers: this.getHeaders() })
      );
      this.usuarioId = response.id; // Armazena o ID do usuário
    } catch (error) {
      console.error('Erro ao obter o ID do usuário:', error);
      this.usuarioId = null; // Certifique-se de que é definido como null em caso de erro
      throw error; // Lance o erro para que ele possa ser tratado no componente
    }
}


  listar(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/produto`).pipe(
      catchError(this.handleError<Item[]>('listar', []))
    );
  }

  editar(produto: Item): Observable<Item> {
    const url = `${this.baseUrl}/items/${produto.id}`;
    return this.http.put<Item>(url, produto, { headers: this.headers }).pipe(
      catchError(this.handleError<Item>('editar'))
    );
  }

  excluir(produtoId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/products/${produtoId}`, { headers: this.headers }).pipe(
      catchError(this.handleError<void>('excluir'))
    );
  }

  addToCart(itemId: number, usuarioId: number | null, quantidade: number): Observable<any> {
    if (!usuarioId) {
      throw new Error('Usuário não autenticado');
    }
    const url = `${this.baseUrl}/carrinho/${usuarioId}`;
    const body = {
      produtoId: itemId, // Corrigido para produtoId conforme seu DTO
      quantidade
    };

    return this.http.post(url, body, { headers: this.headers });
}


  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Verifique o valor do token
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} falhou: ${error.message}`);
      return of(result as T);
    };
  }
}
