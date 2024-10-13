import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../core/types/Usuario';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Contato } from '../../core/types/Contato';
import { ContatoComponent } from '../contato/contato.component';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../core/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  form!: FormGroup;
  usuario: Usuario;
  contatos: Contato[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private usuarioService: UsuarioService
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
    console.log(this.form.valid);

    if (this.form.valid) {
      this.usuario = this.form.value;
      this.usuario.contatos = this.contatos;

      this.usuario.enderecos = [
        { ...this.form.value.enderecoEntrega, tipoEndereco: "ENTREGA" },
        { ...this.form.value.enderecoFaturamento, tipoEndereco: "FATURAMENTO" }
      ];

      this.usuarioService.cadastrar(this.usuario).subscribe(
        (resp: any) => {
          console.log(resp);
          this.alertSuccess("Usuário cadastrado com sucesso!");
          this.router.navigate(['/login']);
        },
        (error) => {
          if (error.error && error.error.length > 0) {
            const firstError = error.error[0];
            this.alertError('Erro ao cadastrar usuário: ' + firstError.message);
          } else {
            this.alertError('Erro ao cadastrar usuário: ' + error.message);
          }
        }
      );

      console.log('Dados enviados:', this.usuario);
    } else {
      this.alertError('Preencha todos os campos obrigatorios!');
    }

  }

  adicionarContato() {
    const modalRef = this.modalService.open(ContatoComponent, {
      windowClass: 'custom-modal-class',
      centered: true
    });

    modalRef.result.then((contato) => {
      console.log(contato);

      if (contato) {
        this.contatos.push(contato);
        this.contatos = [...this.contatos];
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  edit(contato: Contato) {
    const index = this.contatos.indexOf(contato);
    const modalRef = this.modalService.open(ContatoComponent);

    modalRef.componentInstance.contato = contato;
    modalRef.result.then((resp: Contato) => {
      if (index > -1) {
        this.contatos.splice(index, 1);
        this.contatos.push(resp)
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  remove(contact: any) {
    const index = this.contatos.indexOf(contact);
    if (index > -1) {
      this.contatos.splice(index, 1);
    }
  }

  alertSuccess(message: string) {
    Swal.fire({
      title: `<h5 style="color:green">${message}</h5>`,
      icon: 'success',
      confirmButtonText: 'OK',
      showConfirmButton: false,
    });
  }

  alertError(message: string) {
    Swal.fire({
      title: `<h5>${message}</h5>`,
      icon: 'error',
      confirmButtonColor: '#d33',
      confirmButtonText: 'OK',
      showConfirmButton: false,
    });
  }

}