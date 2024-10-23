import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Produto } from '../../types/Produtos'; // Altere o caminho se necessário
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  
  private urlBase = environment.baseUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    });
  }

  cadastrar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.urlBase}/produto`, produto, { headers: this.getHeaders() })
      .pipe(
        tap(response => {
          console.log('Produto cadastrado com sucesso:', response);
          return this.listar(); // Busca os dados mais recentes após inserção bem-sucedida
        }),
        catchError(error => {
          console.error('Erro ao cadastrar o produto:', error);
          throw error;
        })
      );
  }

  listar(page: number = 1, pageSize: number = 10): Observable<{ produtos: Produto[], totalItems: number }> {
    return this.http.get<{ produtos: Produto[], totalItems: number }>(`${this.urlBase}/produtos?page=${page}&size=${pageSize}`, { headers: this.getHeaders() })
      .pipe(
        catchError(error => {
          console.error('Erro ao listar produtos:', error);
          throw error;
        })
      );
  }
}
