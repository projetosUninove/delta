import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, tap } from 'rxjs';
import { LoginResponse } from '../types/login-response.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urlBase = environment.baseUrl;
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn()); // Estado inicial

  loggedIn$ = this.loggedInSubject.asObservable(); // Observable para outros componentes

  constructor(private http: HttpClient) {}

  login(formData: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.urlBase}/login`, formData)
      .pipe(
        tap(response => {
          console.log('Login bem-sucedido:', response);
          if (response.tokenJWT) {
            localStorage.setItem('token', response.tokenJWT);
            this.loggedInSubject.next(true); // Atualiza o estado para logado
          }
        }),
        catchError(error => {
          console.error('Erro no login:', error);
          throw error;
        })
      );
  }

  logout() {
    localStorage.removeItem('token'); // Remove o token
    this.loggedInSubject.next(false); // Atualiza o estado para deslogado
  }

  // Método público que verifica se o usuário está logado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Verifica se o token existe
  }
}
