import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, tap } from 'rxjs';
import { LoginResponse } from '../../login-response.model.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urlBase = environment.baseUrl;
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn()); 

  loggedIn$ = this.loggedInSubject.asObservable(); 

  constructor(private http: HttpClient) {}

  login(formData: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.urlBase}/login`, formData)
      .pipe(
        tap(response => {
          console.log('Login bem-sucedido:', response);
          if (response.tokenJWT) {
            localStorage.setItem('token', response.tokenJWT);
            this.loggedInSubject.next(true); 
          }
        }),
        catchError(error => {
          console.error('Erro no login:', error);
          throw error;
        })
      );
    }

  logout() {
    localStorage.removeItem('token'); 
    this.loggedInSubject.next(false); 
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); 
  }

  decodeToken(token: string): any {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Token inválido');
      }
      
      const payload = parts[1];
      const base64Url = payload.replace(/-/g, '+').replace(/_/g, '/');
      const base64 = decodeURIComponent(atob(base64Url).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(base64); 
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }
}

