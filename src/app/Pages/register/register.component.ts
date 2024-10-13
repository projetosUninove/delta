import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../core/types/Usuario';
import { Endereco } from '../../core/types/Endereco';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  form!: FormGroup;
  usuario: Usuario;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      razaoSocial: new FormControl('', Validators.required),
      nomeFantasia: new FormControl('', Validators.required),
      cnpj: new FormControl('', Validators.required),
      inscricaoEstadual: new FormControl(''),
      inscricaoCcm: new FormControl(''),
      codigoContabil: new FormControl(''),
      email: new FormControl('', [Validators.required]),
      senha: new FormControl('', Validators.required),
      confirmeSenha: new FormControl('', Validators.required),
      enderecoEntrega: this.criarEnderecoFormGroup(),
      enderecoFaturamento: this.criarEnderecoFormGroup()
    });
  }

  criarEnderecoFormGroup(): FormGroup {
    return this.formBuilder.group({
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      cep: ['', Validators.required]
    });
  }


  confirmeSenha(event: any) {

  }

  cancelar() {

  }

  registrar() {

    console.log(this.form.value);
    console.log(this.form.valid);
    
    
    if (this.form.valid) {
      this.usuario = this.form.value;
      

      this.usuario.enderecos = [
        {...this.form.value.enderecoEntrega, tipoEndereco: "ENTREGA"},
        {...this.form.value.enderecoFaturamento, tipoEndereco: "FATURAMENTO"}
      ];
      
  
      console.log('Dados enviados:', this.usuario);  // Aqui você envia o payload ao backend
    }

  }


}
