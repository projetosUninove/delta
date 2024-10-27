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

  // Método para cadastrar um novo usuário
  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.urlBase}/usuario`, usuario, { headers: this.headers });
  }

  // Método para obter o ID do usuário a partir do token
  obterUsuarioId(): Observable<number> {
    return this.http.get<{ id: number }>(`${this.urlBase}/usuario/user-id`, { headers: this.headers })
      .pipe(map(response => response.id)); // Retorna apenas o ID
  }

  // Método para configurar os cabeçalhos de autenticação
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
}
