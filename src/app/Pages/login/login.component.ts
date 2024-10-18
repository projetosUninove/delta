import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../core/services/login.service';
import { LoginResponse } from '../../login-response.model.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;  

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      senha: ['', Validators.required]
    });
  }

  alertSuccess(message: string) {
    Swal.fire({
      title: `<h5 style="color:green">${message}</h5>`,
      icon: 'success',
      confirmButtonText: 'OK',
      showConfirmButton: false,
      timer: 1500 
    });
  }

  alertError(message: string) {
    Swal.fire({
      title: `<h5>${message}</h5>`,
      icon: 'error',
      confirmButtonColor: '#d33',
      confirmButtonText: 'OK',
      showConfirmButton: false,
      timer: 2000 
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;  

      this.loginService.login(formData).subscribe(
        (result: LoginResponse) => {
          console.log('Login bem-sucedido:', result);

          if (result.tokenJWT) {
            localStorage.setItem('token', result.tokenJWT);
            
            const decodedToken = this.loginService.decodeToken(result.tokenJWT);
            console.log('Token Decodificado:', decodedToken);

            this.alertSuccess('Login bem-sucedido!');
            this.router.navigate(['/home']); 
          } else {
            this.alertError(result.message || 'Erro desconhecido');
          }
        },
        error => {
          console.error('Falha no login:', error);
          this.alertError('Falha no login. Por favor, tente novamente.');
        }
      );
    } else {
      this.alertError('Por favor, preencha todos os campos corretamente.');
    }
  }
}
