import { Injectable } from '@angular/core';
import { Usuario } from '../types/Usuario';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlBase: string = environment.baseUrl;
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient
  ) { 
    this.headers = new HttpHeaders();
  }

  cadastrar(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.urlBase}/usuario`, usuario)
  }

}
