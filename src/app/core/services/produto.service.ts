import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Produto } from '../../types/Produtos'; // Altere o caminho se necessário
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  
  private urlBase = environment.baseUrl; // Base URL do seu backend

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Pega o token do localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`, // Adiciona o token no cabeçalho
      'Content-Type': 'application/json'
    });
  }

  cadastrar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.urlBase}/produto`, produto, { headers: this.getHeaders() })
      .pipe(
        tap(response => {
          console.log('Produto cadastrado com sucesso:', response);
        }),
        catchError(error => {
          console.error('Erro ao cadastrar o produto:', error);
          throw error; // Repassa o erro
        })
      );
  }

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.urlBase}/produtos`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error('Erro ao listar produtos:', error);
          throw error; // Repassa o erro
        })
      );
  }
}
