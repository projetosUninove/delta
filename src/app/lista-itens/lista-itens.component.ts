import { Component, OnInit } from '@angular/core';
import { ItemService } from '../core/services/item.service';
import { UsuarioService } from '../core/services/usuario.service'; // Certifique-se de ajustar o caminho
import { Item } from '../types/item';
import { Usuario } from '../types/Usuario'; // Ajuste para importar o tipo correto do usuário

@Component({
  selector: 'app-lista-itens',
  templateUrl: './lista-itens.component.html',
  styleUrls: ['./lista-itens.component.css']
})
export class ListaItensComponent implements OnInit {
  itens: Item[] = [];
  quantidade: { [key: number]: number } = {};
  public usuarioId: number | null = null;
  public usuario: Usuario | null = null; // Defina o tipo apropriado para os detalhes do usuário

  constructor(
    private itemService: ItemService,
    private usuarioService: UsuarioService // Adicione o serviço de usuário
  ) {}

  ngOnInit() {
    this.carregarItens();
    this.obterUsuarioId(); // Chama o método para obter o ID do usuário
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

  obterUsuarioId() {
    this.usuarioService.obterUsuarioId().subscribe({
      next: (id: number | null) => {
        this.usuarioId = id; 
        this.obterUsuario(); 
      },
    });
  }

  obterUsuario() {
    if (this.usuarioId !== null) {
      this.usuarioService.obterUsuarioPorId(this.usuarioId).subscribe({
        next: (data) => {
          this.usuario = data; // Armazena os detalhes do usuário
          console.log('Detalhes do usuário:', this.usuario);
        },
        error: (error) => {
          console.error('Erro ao obter detalhes do usuário', error);
          alert('Erro ao obter detalhes do usuário. Tente novamente.');
        }
      });
    } else {
      console.error('ID do usuário não definido');
    }
  }
}
