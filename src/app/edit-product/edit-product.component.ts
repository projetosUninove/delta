import { Component } from '@angular/core';
import { Item } from '../types/item';
import { ItemService } from '../core/services/item.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  produtoEdicao!: Item; // Certifique-se de inicializar este objeto antes de usar.

  constructor(private itemService: ItemService) {}

  onSubmit() {
    this.itemService.editar(this.produtoEdicao).subscribe(
      (response) => {
        console.log('Produto editado com sucesso', response);
        // Redirecionar ou fazer outras ações após a edição
      },
      (error) => {
        console.error('Erro ao editar produto', error);
      }
    );
  }

  cancelarEdicao() {
    // Lógica para cancelar a edição
  }
}
