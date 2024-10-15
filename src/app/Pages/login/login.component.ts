
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from '../types/login-response.model';
import { LoginService } from '../core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = new FormData();
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        if (control && control.value !== undefined) {
          formData.append(key, control.value);
        }
      });

      this.loginService.login(formData).subscribe(
        (result: LoginResponse) => {
          console.log('Login successful:', result);
          if (result.success) {
            this.router.navigate(['/home']);
          } else {
            alert('Falha no login: ' + result.message || 'Erro desconhecido');
          }
        },
        error => {
          console.error('Login failed:', error);
          alert('Falha no login. Por favor, tente novamente.');
        }
      );
    }
  }
}
