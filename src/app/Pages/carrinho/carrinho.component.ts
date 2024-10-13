import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
})
export class CarrinhoComponent {
  private isCompraFinalizada = false;

  produtos = [
    { nome: 'Produto 1', preco: 10, quantidade: 2 },
    { nome: 'Produto 1', preco: 10, quantidade: 2 },
    { nome: 'Produto 1', preco: 10, quantidade: 2 },
    // adicione mais produtos conforme necessário
  ];

  get totalPreco() {
    return this.produtos.reduce(
      (total, produto) => total + produto.preco * produto.quantidade,
      0
    );
  }

  limpaCarrinho(){
    this.produtos = [];
  }

  limparCarrinho() {
    if(this.produtos.length === 0){
    Swal.fire({
      title: 'Carrinho Vazio',
      text: 'Seu carrinho já está vazio!',
      icon: 'error',
      timer: 2000,
    });
  }else{
    Swal.fire({
      title: 'Carrinho Limpo',
      text: 'Seu carrinho foi esvaziado!',
      icon: 'success',
      timer: 2000,
    }).then(() => {
      this.limpaCarrinho();
    });
  }
  }
  

  finalizarCompra() {
    if (this.produtos.length === 0) {
      Swal.fire({
        title: 'Erro',
        text: 'Seu carrinho está vazio!',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } else {
      Swal.fire({
        title: 'Compra Finalizada',
        text: 'Obrigado pela sua compra!',
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then(() => {
        this.isCompraFinalizada = true;
        this.limpaCarrinho();})
    }
    // Limpar o carrinho após a compra
  }
}
