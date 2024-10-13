import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserRequestDto } from 'src/app/core/types/user.ts';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form!: FormGroup;
  userRequest: UserRequestDto;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.userRequest = new UserRequestDto();
  }

  ngOnInit(): void {
    window.scroll(0, 0);

    this.form = this.formBuilder.group({
      razaoSocial: ['', Validators.required],
      nomeFantasia: ['', Validators.required],
      cnpj: ['', [Validators.required, Validators.pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)]],
      estadual: ['', Validators.required],
      ccm: ['', Validators.required],
      codigoContabil: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      nomeCompleto: ['', Validators.required],
      tel: ['', Validators.required],
      cargo: ['', Validators.required],
      area: ['', Validators.required],
      cepEmissao: ['', Validators.required],
      logradouroEmissao: ['', Validators.required],
      numeroEmissao: ['', Validators.required],
      complementoEmissao: ['', Validators.required],
      bairroEmissao: ['', Validators.required],
      cepEntrega: ['', Validators.required],
      logradouroEntrega: ['', Validators.required],
      numeroEntrega: ['', Validators.required],
      complementoEntrega: ['', Validators.required],
      bairroEntrega: ['', Validators.required]    });
  }

}

