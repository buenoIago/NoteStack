import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth, UsuarioDto } from '../../services/auth';

@Component({
  imports: [RouterLink],
  selector: 'app-navbar',
  templateUrl: './navbar.html',
})
export class Navbar {
  login = false;
  usuario: UsuarioDto | null = null;

  constructor(private auth: Auth) {
    this.carregarUsuario();
  }

  carregarUsuario() {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      return;
    }

    this.auth.me().subscribe({
      next: (usuario) => {
        this.usuario = usuario;
        this.login = true;
      },
      error: () => {
        this.usuario = null;
        this.login = false;
        localStorage.removeItem('accessToken');
      }
    });
  }
}