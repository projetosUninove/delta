import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submitForm(): void {
    if (this.loginForm.invalid) {
      const email = this.loginForm.get('email');
      const password = this.loginForm.get('password');

      if (email?.hasError('required')) {
        Swal.fire({
          title: 'Erro',
          text: 'Por Favor, insira um email.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      } else if (email?.hasError('email')) {
        Swal.fire({
          title: 'Erro',
          text: 'Por Favor, insira um email válido.',
          icon: 'error',
          timer: 2000,
        });
      } else if (password?.hasError('required')) {
        Swal.fire({
          title: 'Erro',
          text: 'Por Favor, insira uma senha.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      } else if (password?.hasError('minlength')) {
        Swal.fire({
          title: 'Erro',
          text: 'Por Favor, insira uma senha com no mínimo 6 caracteres.',
          icon: 'error',
          timer: 2000,
        });
      }
    } else {
      Swal.fire({
        title: 'Sucesso',
        text: 'Login efetuado com sucesso!',
        icon: 'success',
        timer: 2000,
      });
      
    }
  }
}
