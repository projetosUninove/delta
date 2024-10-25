import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../core/services/item.service';
import { Item } from '../../types/item';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent implements OnInit {
  itens: Item[] = [];
  produtoEdicao: Item | null = null;

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

  prepararEdicao(item: Item) {
    this.produtoEdicao = { ...item }; // Faz uma cópia do item a ser editado
  }

  salvarEdicao() {
    if (this.produtoEdicao) {
      this.itemService.editar(this.produtoEdicao).subscribe(
        (updatedItem) => {
          const index = this.itens.findIndex((i) => i.id === updatedItem.id);
          if (index > -1) {
            this.itens[index] = updatedItem; // Atualiza a lista de itens
          }
          this.produtoEdicao = null; // Reseta o item em edição
          console.log('Produto editado com sucesso:', updatedItem);
        },
        (error) => {
          console.error('Erro ao salvar edição do produto', error);
          alert('Erro ao salvar edição. Tente novamente.');
        }
      );
    }
  }

  cancelarEdicao() {
    this.produtoEdicao = null; // Cancela a edição
  }

  excluir(produtoId: number) {
    this.itemService.excluir(produtoId).subscribe(
      () => {
        this.itens = this.itens.filter((i) => i.id !== produtoId); // Remove o item da lista
        console.log(`Produto ${produtoId} excluído com sucesso`);
      },
      (error) => {
        console.error('Erro ao excluir produto', error);
        alert('Erro ao excluir produto. Tente novamente.');
      }
    );
  }
}
