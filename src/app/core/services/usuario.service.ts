import { Injectable } from '@angular/core';
import { Usuario } from '../../types/Usuario'; // Ajuste o caminho conforme necessário
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class UsuarioService {
  private urlBase: string = environment.baseUrl;
  private headers: HttpHeaders;
  

  constructor(private http: HttpClient) {
    this.headers = this.getHeaders(); // Inicializa os cabeçalhos
  }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.urlBase}/usuario`, usuario, { headers: this.headers });
  }

  obterUsuarioPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlBase}/usuario/${id}`, {
      headers: this.getHeaders()
    });
  }

  obterUsuarioId(): Observable<number> {
    return this.http.get<{ id: number }>(`${this.urlBase}/usuario/user-id`, { headers: this.headers })
      .pipe(map(response => response.id)); // Retorna apenas o ID
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  
}
