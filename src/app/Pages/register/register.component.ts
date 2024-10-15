import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../core/types/Usuario';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Contato } from '../../core/types/Contato';
import { ContatoComponent } from '../contato/contato.component';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../core/services/usuario.service';
import { ViacepService } from '../../core/services/viacep.service';

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
    private usuarioService: UsuarioService,
    private viaCep: ViacepService,
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

  cancelar() {
    this.router.navigate(['/login']);
  }

  registrar() {
    if (this.form.valid) {

      if (this.form.value.senha != this.form.value.confirmeSenha) {
        this.alertError('A senhas devem ser iguais!');
      } else {

        this.usuario = this.form.value;
        this.usuario.contatos = this.contatos;

        this.usuario.enderecos = [
          { ...this.form.value.enderecoEntrega, tipoEndereco: "ENTREGA" },
          { ...this.form.value.enderecoFaturamento, tipoEndereco: "FATURAMENTO" }
        ];

        this.usuarioService.cadastrar(this.usuario).subscribe(
          (resp: any) => {
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
      }
    } else {
      this.alertError('Preencha todos os campos obrigatorios!');
    }
  }

  buscarCep(cep: string, formGroup: FormGroup) {

    if (cep?.length === 9) {
      this.viaCep.buscarCep(cep).subscribe(
        (resp: any) => {
          if (resp) {
            formGroup.patchValue({
              logradouro: resp.logradouro,
              bairro: resp.bairro,
              cidade: resp.localidade,
              estado: resp.uf,
              cep: resp.cep
            });
          }
        },
        (error) => {
          this.alertError("CEP inválido");
        }
      );
    }
  }

  buscarCepEntrega(event: any) {
    let cep = event.target.value
    if (cep) {
      this.buscarCep(cep, this.form.get('enderecoEntrega') as FormGroup);
    }
  }

  buscarCepFaturamento(event: any) {
    let cep = event.target.value
    if (cep) {
      this.buscarCep(cep, this.form.get('enderecoFaturamento') as FormGroup);
    }
  }

  adicionarContato() {
    const modalRef = this.modalService.open(ContatoComponent, {
      windowClass: 'custom-modal-class',
      centered: true
    });

    modalRef.result.then((contato) => {
      if (contato) {
        this.contatos.push(contato);
        this.contatos = [...this.contatos];
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  editarContato(contato: Contato) {
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

  removerContato(contact: any) {

    Swal.fire({
      title: 'ATENÇÃO!',
      text: 'Deseja realmente cancelar esta consulta?',
      showCancelButton: true,
      confirmButtonText: 'SIM',
      cancelButtonText: 'NÃO',
      icon: 'warning'
    }).then((result) => {
      if (result.value) {
        const index = this.contatos.indexOf(contact);
        if (index > -1) {
          this.contatos.splice(index, 1);
        }
        this.alertSuccess('Contato excluido com sucesso!')
      }
    })

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