import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  submitForm(event: Event) {
    event.preventDefault();
    const emailInput = (document.getElementById('email') as HTMLInputElement).value;
    const passwordInput = (document.getElementById('password') as HTMLInputElement).value;

    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

    if (!emailInput) {
      Swal.fire({
        title: 'Erro',
        text: 'Por Favor, insira um email.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }else if(!emailRegex.test(emailInput)){
      Swal.fire({
        title: 'Erro',
        text: 'Por Favor, insira um email válido.',
        icon: 'error',
        timer: 2000,
      });
    }else if (!passwordInput) {
      Swal.fire({
        title: 'Erro',
        text: 'Por Favor, insira uma senha.',
        icon: 'error',
        confirmButtonText: 'Ok',
      })
    }else if(passwordInput.length < 6){
      Swal.fire({
        title: 'Erro',
        text: 'Por Favor, insira uma senha com no mínimo 6 caracteres.',
        icon: 'error',
        timer: 2000,
      });
    } else{
      Swal.fire({
        title: 'Sucesso',
        text: 'Login efetuado com sucesso!',
        icon: 'success',
        timer: 2000,
      })
    }
  }
}
