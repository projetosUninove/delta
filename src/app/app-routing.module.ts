import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { ProductsComponent } from './Pages/products/products.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { CarrinhoComponent } from './Pages/carrinho/carrinho.component';
import { ForgotPassComponent } from './Pages/forgot-pass/forgot-pass.component';
import { EstoqueComponent } from './Pages/estoque/estoque.component';
import { CadastroEstoqueComponent } from './Pages/cadastro-estoque/cadastro-estoque.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'carrinho', component: CarrinhoComponent },
  { path: 'forgotPass', component: ForgotPassComponent },
  { path: 'estoque', component: EstoqueComponent },
  { path: 'cadastro-estoque', component: CadastroEstoqueComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
