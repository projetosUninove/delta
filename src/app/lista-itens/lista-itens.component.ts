import { Component, OnInit } from '@angular/core';
import { ItemService } from '../core/services/item.service';
import { Item } from '../types/item';

@Component({
  selector: 'app-lista-itens',
  templateUrl: './lista-itens.component.html',
  styleUrls: ['./lista-itens.component.css']
})
export class ListaItensComponent implements OnInit {
  itens: Item[] = [];
  quantidade: { [key: number]: number } = {};
  public usuarioId: number | null = null;
  

  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.carregarItens();
    this.obterUsuarioId();
  }

  async obterUsuarioId() {
    try {
      // Garantimos que obterUsuarioId está definido no ItemService
      if (!this.itemService || !this.itemService.obterUsuarioId) {
        throw new Error('ItemService não está inicializado ou falta método obterUsuarioId');
      }
  
      await this.itemService.obterUsuarioId();
      
      // Verificamos se o usuarioId foi definido com sucesso
      if (!this.itemService.usuarioId) {
        throw new Error('usuarioId não foi definido após obterUsuarioId');
      }
      
      this.usuarioId = this.itemService.usuarioId;
      console.log('ID do usuário obtido com sucesso:', this.usuarioId);
  
      return true; // Indica que a operação foi bem-sucedida
    } catch (error) {
      console.error('Erro ao obter o ID do usuário:', error);
      alert(`Erro ao obter o ID do usuário. Por favor, tente novamente.\n`);
      return false; // Indica falha na operação
    }
  }
  

  carregarItens() {
    this.itemService.listar().subscribe({
      next: (response) => {
        this.itens = response;
        console.log('Itens recebidos:', this.itens);
      },
      error: (error) => {
        console.error('Erro ao carregar itens', error);
        alert('Erro ao carregar itens. Tente novamente.');
      }
    });
  }

  adicionarAoCarrinho(item: Item): void {
    const quantidade = this.quantidade[item.id] || 0;

    if (quantidade <= 0) {
      alert('Por favor, insira uma quantidade válida.');
      return;
    }

    if (!this.usuarioId) {
      alert('Usuário não autenticado. Por favor, faça login.');
      return;
    }

    this.itemService.addToCart(item.id, this.usuarioId, quantidade).subscribe({
      next: () => {
        this.quantidade[item.id] = 0; // Reseta a quantidade após adicionar ao carrinho
        console.log(`Item ${item.nome} adicionado ao carrinho com sucesso.`);
      },
      error: (error) => {
        console.error('Erro ao adicionar ao carrinho:', error);
        alert('Erro ao adicionar o item ao carrinho. Tente novamente.');
      }
    });
  }
}
