import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../core/services/login.service';
import { LoginResponse } from '../../core/types/login-response.model';

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

            this.router.navigate(['/home']); 
          } else {
            alert('Falha no login: ' + (result.message || 'Erro desconhecido'));
          }
        },
        error => {
          console.error('Falha no login:', error);
          alert('Falha no login. Por favor, tente novamente.');
        }
      );
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }
}
