import { Component, Input } from '@angular/core';
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
  form!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {
    this.contato = new Contato();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nomeCompleto: new FormControl(''),
      telefone: new FormControl(''),
      celular: new FormControl(''),
      email: new FormControl(''),
      cargo: new FormControl(''),
      area: new FormControl(''),
    });
  }

  salvar(){

    if (this.form.valid) {
      this.contato = this.form.value;

      console.log("Dados modal"+this.contato);
      this.activeModal.close(this.contato); 
    }

  }



}
