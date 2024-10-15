import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { LoginResponse } from '../types/login-response.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urlBase = environment.baseUrl;

  constructor(private http: HttpClient) {}

  login(formData: FormData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.urlBase}/login`, formData)
      .pipe(
        tap(response => {
          console.log('Login bem-sucedido:', response);
        }),
        catchError(error => {
          console.error('Erro no login:', error);
          throw error; 
        })
      );
  }
}
