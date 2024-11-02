import { Component } from '@angular/core';
import { ProdutoService } from '../../core/services/produto.service';
import { Produto } from '../../types/Produtos';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  id!: number | null;

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.id = params['id'];

    });
  }

  ngOnInit(): void {
    if (this.id != null) {
      this.buscarProdutoPorId();
    }
  }

  cadastrarProduto() {
    if (this.id != null) {
      this.produtoService.atualizarProduto(this.id, this.produto).subscribe(
        (response) => {
          this.alertSuccess('Produto Atualizado com sucesso');
          this.router.navigate(['/estoque']);
        },
        (error) => {
          this.alertError('Erro ao cadastrar o produto');
        }
      );
      
    } else {
      this.produtoService.cadastrar(this.produto).subscribe(
        (response) => {
          console.log('Produto cadastrado com sucesso', response);
        },
        (error) => {
          console.error('Erro ao cadastrar o produto', error);
          alert('Erro ao cadastrar o produto. Tente novamente.');
        }
      );
    }
  }

  buscarProdutoPorId() {
    this.produtoService.buscarProdutoPorId(this.id!).subscribe(data => {
      this.produto = data
    });
  }

  alertSuccess(message: string) {
    Swal.fire({
      title: `<h5 style="color:green">${message}</h5>`,
      icon: 'success',
      confirmButtonText: 'OK',
      showConfirmButton: false,
    });
  }

  alertError(message: string) {
    Swal.fire({
      title: `<h5>${message}</h5>`,
      icon: 'error',
      confirmButtonColor: '#d33',
      confirmButtonText: 'OK',
      showConfirmButton: false,
    });
  }

}