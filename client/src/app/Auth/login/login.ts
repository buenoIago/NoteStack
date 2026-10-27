import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.services';

@Component({
  imports: [ RouterLink, FormsModule],
  selector: 'app-login',
  templateUrl: './login.html',
})
export class Login {
  cadastro = false;

  nome = '';
  email = '';
  senha = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.cadastro = this.route.snapshot.routeConfig?.path === 'cadastro';
  }

  cadastrar() {
    const request = {
      nome: this.nome,
      email: this.email,
      senha: this.senha
    };

    this.authService.cadastrar(request).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (erro: any) => {
        console.error(erro);
      }
    });
  }

  entrar() {
    const request = {
      email: this.email,
      senha: this.senha
    };

    this.authService.login(request).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (erro) => {
        console.error(erro);
      }
    });
  }
}