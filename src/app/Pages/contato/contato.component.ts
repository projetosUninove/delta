import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contato } from '../../types/Contato';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent {

  @Input()
  contato: Contato;

  @Output()
  contatoUpdated = new EventEmitter<Contato>();

  form!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    this.contato = new Contato();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nomeCompleto: new FormControl(this.contato.nomeCompleto, Validators.required),
      telefone: new FormControl(this.contato.telefone, Validators.required),
      celular: new FormControl(this.contato.celular),
      email: new FormControl(this.contato.email, Validators.required),
      cargo: new FormControl(this.contato.cargo, Validators.required),
      area: new FormControl(this.contato.area, Validators.required),
    });
  }

  salvar() {
    if (this.form.valid) {
      this.contato = this.form.value;
      this.contatoUpdated.emit(this.contato);
      this.activeModal.close(this.contato);
    }else {
      this.alertError('Preencha todos os campos obrigatorios!');
    }
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