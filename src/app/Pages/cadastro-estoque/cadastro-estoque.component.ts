import { Component } from '@angular/core';
import { ProdutoService } from '../../core/services/produto.service';
import { Produto } from '../../types/Produtos';

@Component({
  selector: 'app-cadastro-estoque',
  templateUrl: './cadastro-estoque.component.html',
  styleUrls: ['./cadastro-estoque.component.css'],
})
export class CadastroEstoqueComponent {
  produto: Produto = {
    id: 0,
    nome: '',
    descricao: '',
    preco: 0,
    imagem: '',
    quantidade: 0,
  };

  estoque: Produto[] = [];

  constructor(private produtoService: ProdutoService) {}

  cadastrarProduto() {
    this.produtoService.cadastrar(this.produto).subscribe(
      (response) => {
        console.log('Produto cadastrado com sucesso', response);
        this.estoque.push(response); // Atualiza o estoque local com a resposta do servidor
        this.resetarFormulario();
      },
      (error) => {
        console.error('Erro ao cadastrar o produto', error);
        alert('Erro ao cadastrar o produto. Tente novamente.'); // Mensagem de erro ao usuário
      }
    );
  }

  removerProduto(index: number) {
    this.estoque.splice(index, 1);
  }

  resetarFormulario() {
    this.produto = {
      id: 0,
      nome: '',
      descricao: '',
      preco: 0,
      imagem: '',
      quantidade: 0,
    };
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      console.log('Arquivo selecionado:', file);
      const reader = new FileReader();
      reader.onload = () => {
        this.produto.imagem = reader.result as string; // Converte o arquivo para base64
      };
      reader.readAsDataURL(file);
    }
  }
}
