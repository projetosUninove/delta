import { Component } from '@angular/core';

interface Produto {
  nome: string;
  quantidade: number;
  descricao: string;
}

@Component({
  selector: 'app-cadastro-estoque',
  templateUrl: './cadastro-estoque.component.html',
  styleUrls: ['./cadastro-estoque.component.css']
})
export class CadastroEstoqueComponent {
  produto: Produto = {
    nome: '',
    quantidade: 0,
    descricao: ''
  };

  estoque: Produto[] = [];

  cadastrarProduto() {
    if (this.produto.nome && this.produto.quantidade > 0) {
      this.estoque.push({ ...this.produto });
      this.produto = { nome: '', quantidade: 0, descricao: '' }; // Limpa o formulário
    } else {
      alert('Por favor, preencha os campos corretamente.');
    }
  }

  removerProduto(index: number) {
    this.estoque.splice(index, 1);
  }
}
