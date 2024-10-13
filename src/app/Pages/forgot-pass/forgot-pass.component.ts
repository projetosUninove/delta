import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrl: './forgot-pass.component.css'
})
export class ForgotPassComponent {
  submitResetPassword(event: Event){
    event.preventDefault();
    const emailInput = (document.getElementById('email') as HTMLInputElement).value;

    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

    if(!emailInput) {
      Swal.fire({
        title: 'Erro',
        text: 'Por favor, insira um email.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }else if(!emailRegex.test(emailInput)){
      Swal.fire({
        title: 'Erro',
        text: 'Por favor, insira um email válido.',
        icon: 'error',
        timer: 2000,
      });
    } else{
      Swal.fire({
        title: 'Sucesso',
        text: 'Email para recuperação enviado com sucesso.',
        icon: 'success',
        timer: 2000,
      });
    }
  }
}
