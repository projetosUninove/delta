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

  constructor(private http: HttpClient) {
    this.headers = this.getHeaders();
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Verifique o valor do token
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
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

  listar(page: number = 1, pageSize: number = 10): Observable<{ produtos: Produto[], totalItems: number }> {
    return this.http.get<{ produtos: Produto[], totalItems: number }>(`${this.urlBase}/produtos?page=${page}&size=${pageSize}`, { headers: this.headers })
      .pipe(
        catchError(error => {
          console.error('Erro ao listar produtos:', error);
          throw error;
        })
      );
  }

  buscarProdutoPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.urlBase}/produto/${id}`, { headers: this.headers })
  }

  atualizarProduto(id: number, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.urlBase}/produto/${id}`, produto, { headers: this.headers })
  }

}
