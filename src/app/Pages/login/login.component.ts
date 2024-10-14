import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../core/types/Usuario';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Contato } from '../../core/types/Contato';
import { ContatoComponent } from '../contato/contato.component';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../core/services/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = '/login';
  private urlBase: string = environment.baseUrl;
  private headers: HttpHeaders;

  constructor(private http: HttpClient){}

  login(email : string, senha:string): observable<any>{

    const body = {email, senha};
    return this.http.post(this./this.apiUrl, body);
  }