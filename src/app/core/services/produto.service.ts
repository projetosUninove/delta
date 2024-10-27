import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Produto } from '../../types/Produtos';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private urlBase = environment.baseUrl;
  private headers: HttpHeaders;
  private usuarioId: number | null = null;

  constructor(private http: HttpClient) {
    this.headers = this.getHeaders();
  }

  private decodeToken(token: string): any {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Token inválido');
      }
      
      const payload = parts[1];
      const base64Url = payload.replace(/-/g, '+').replace(/_/g, '/');
      const base64 = decodeURIComponent(atob(base64Url).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

      return JSON.parse(base64); 
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }

  getUsuarioId(): number | null {
    return this.usuarioId;
  }

  cadastrar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.urlBase}/produto`, produto, { headers: this.headers })
      .pipe(
        tap(response => {
          console.log('Produto cadastrado com sucesso:', response);
          return this.listar();
        }),
        catchError(error => {
          console.error('Erro ao cadastrar o produto:', error);
          throw error;
        })
      );
  }

  addToCart(itemId: number, usuarioId: number | null, quantidade: number): Observable<any> {
    if (!usuarioId) {
      throw new Error('Usuário não autenticado');
    }
    const url = `${this.urlBase}/carrinho/${usuarioId}`;
    const body = {
      itemId,
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

  listar(page: number = 1, pageSize: number = 10): Observable<{ produtos: Produto[], totalItems: number }> {
    return this.http.get<{ produtos: Produto[], totalItems: number }>(`${this.urlBase}/produtos?page=${page}&size=${pageSize}`, { headers: this.headers })
      .pipe(
        catchError(error => {
          console.error('Erro ao listar produtos:', error);
          throw error;
        })
      );
  }
}
