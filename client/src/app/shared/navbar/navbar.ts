import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Auth/auth.services';

@Component({
  imports: [RouterLink],
  selector: 'app-navbar',
  templateUrl: './navbar.html',
})
export class Navbar {
  protected readonly authService = inject(AuthService);
  protected readonly sessaoAutenticada = this.authService.sessao;

  private readonly router = inject(Router);

  sair() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (erro) => {
        console.error(erro);
      }
    });
  }
}