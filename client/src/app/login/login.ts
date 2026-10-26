import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Navbar } from '../shared/navbar/navbar';
import { Auth } from '../services/auth';

@Component({
  imports: [Navbar, RouterLink, FormsModule],
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
    private auth: Auth
  ) {
    this.cadastro = this.route.snapshot.routeConfig?.path === 'cadastro';
  }

  cadastrar() {
    const request = {
      nome: this.nome,
      email: this.email,
      senha: this.senha
    };

    this.auth.cadastrar(request).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (erro) => {
        console.error(erro);
      }
    });
  }

  entrar() {
    const request = {
      email: this.email,
      senha: this.senha
    };

    this.auth.login(request).subscribe({
      next: (token) => {
        localStorage.setItem('accessToken', token.accessToken);

        console.log(token);

        this.router.navigate(['/']);
      },
      error: (erro) => {
        console.error(erro);
      }
    });
  }
}