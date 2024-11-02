import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgIconsModule } from '@ng-icons/core';
import { ionPersonOutline } from '@ng-icons/ionicons';
import {
  ionLogoWhatsapp,
  ionLogoFacebook,
  ionLogoInstagram,
} from '@ng-icons/ionicons';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HomeComponent } from './Pages/home/home.component';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { ProductsComponent } from './Pages/products/products.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './Pages/login/login.component';
import { CarrinhoComponent } from './Pages/carrinho/carrinho.component';
import { ForgotPassComponent } from './Pages/forgot-pass/forgot-pass.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTabsModule } from '@angular/material/tabs';
import { RegisterComponent } from './Pages/register/register.component';
import { ContatoComponent } from './Pages/contato/contato.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { CadastroEstoqueComponent } from './Pages/cadastro-estoque/cadastro-estoque.component';
import { ListaItensComponent } from './lista-itens/lista-itens.component';
import { EstoqueComponent } from './Pages/estoque/estoque.component';
import { EditProductComponent } from './edit-product/edit-product.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
    IntroductionComponent,
    ProductsComponent,
    HomeComponent,
    TestimonialsComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    CarrinhoComponent,
    ForgotPassComponent,
     ContatoComponent,
     CadastroEstoqueComponent,
     ListaItensComponent,
     EstoqueComponent,
     EditProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    NgxMaskDirective, NgxMaskPipe,
    HttpClientModule,
    NgIconsModule.withIcons({
      ionPersonOutline,
      ionLogoWhatsapp,
      ionLogoFacebook,
      ionLogoInstagram,
    }),
  ],
  providers: [provideAnimationsAsync(), provideNgxMask()],
  bootstrap: [AppComponent],
})
export class AppModule { }
