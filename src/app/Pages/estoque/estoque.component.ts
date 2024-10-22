import { Component } from '@angular/core';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent {
  produtos = [
    { nome: 'MOP', quantidade: 10 },
    { nome: 'LUVA', quantidade: 20 },
    { nome: 'CERA', quantidade: 15 }
  ];

  adicionar(produto: any) {
    produto.quantidade++;
  }

  retirar(produto: any) {
    if (produto.quantidade > 0) {
      produto.quantidade--;
    }
  }

  excluir(produto: any) {
    this.produtos = this.produtos.filter(p => p !== produto);
  }

  calcularTotal() {
    return this.produtos.reduce((total, produto) => total + produto.quantidade, 0);
  }
}
