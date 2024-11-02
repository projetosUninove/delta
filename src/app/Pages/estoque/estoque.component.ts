import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../core/services/item.service';
import { Item } from '../../types/item';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../../core/services/produto.service';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent implements OnInit {
  itens: Item[] = [];
  produtoEdicao: Item | null = null;
  id!: number | null;
  constructor(
    private itemService: ItemService,
    private produtoService: ProdutoService,

    private router: Router,
    private route: ActivatedRoute,
    ) {
      this.route.params.subscribe(params => {
        this.id = params['id'];
  
      });
    }

  

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

  editar(id: number) {
    this.router.navigate(['/cadastro-estoque', id]);
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

  deletarProduto(id: number) {
    this.itemService.deletarProduto(id).subscribe({
      next: () => {
        console.log('Produto deletado com sucesso');
        this.carregarItens(); // Recarrega os itens para refletir as mudanças
      },
      error: (error) => {
        console.error('Erro ao deletar produto', error);
        alert('Erro ao deletar produto. Tente novamente.');
      }
    });
  }
  
  
  }
