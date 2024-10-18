import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../core/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    // Assine para as mudanças de login
    this.loginService.loggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn; // Atualiza o estado de login
    });
    
    // Verifique o estado inicial
    this.isLoggedIn = this.loginService.isLoggedIn();
  }

  logout() {
    this.loginService.logout(); // Chama o método de logout do serviço
    // Você pode redirecionar para a página de login aqui, se desejar
  }
}
