import { Component, OnInit } from '@angular/core';
import { ItemService } from '../core/services/item.service';
import { Item } from '../types/item'; // Altere o caminho se necessário

@Component({
  selector: 'app-lista-itens',
  templateUrl: './lista-itens.component.html',
  styleUrls: ['./lista-itens.component.css']
})
export class ListaItensComponent implements OnInit {
  itens: Item[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.carregarItens();
  }

  carregarItens() {
    this.itemService.listar().subscribe(
      (response) => {
        this.itens = response; 
        console.log('Itens recebidos:', this.itens);
      },
      (error) => {
        console.error('Erro ao carregar itens', error);
        alert('Erro ao carregar itens. Tente novamente.');
      }
    );
  }
}
