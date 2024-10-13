import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contato } from '../../core/types/Contato';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
      nomeCompleto: new FormControl(this.contato.nomeCompleto),
      telefone: new FormControl(this.contato.telefone),
      celular: new FormControl(this.contato.celular),
      email: new FormControl(this.contato.email),
      cargo: new FormControl(this.contato.cargo),
      area: new FormControl(this.contato.area),
    });
  }

  salvar() {
    if (this.form.valid) {
      this.contato = this.form.value;
      this.contatoUpdated.emit(this.contato);
      this.activeModal.close(this.contato);
    }
  }

}