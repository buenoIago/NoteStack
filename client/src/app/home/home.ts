import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Navbar } from '../shared/navbar/navbar';
import { AuthService } from '../Auth/auth.services';

import { NotaDto } from '../notas/notas.models';
import { NotasService } from '../notas/notas.service';

import { CategoriaDto } from '../categorias/categorias.models';
import { CategoriasService } from '../categorias/categorias.service';

@Component({
  imports: [Navbar, RouterLink],
  selector: 'app-home',
  templateUrl: './home.html',
})
export class Home {
  notas: NotaDto[] = [];
  categorias: CategoriaDto[] = [];

  constructor(
    protected authService: AuthService,
    private notasService: NotasService,
    private categoriasService: CategoriasService
  ) {
    this.carregarNotas();
    this.carregarCategorias();
  }

  carregarNotas() {
    this.notasService.listar().subscribe({
      next: (notas) => {
        this.notas = notas;
      },
      error: (erro) => {
        console.error(erro);
      }
    });
  }

  carregarCategorias() {
    this.categoriasService.listar().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
      error: (erro) => {
        console.error(erro);
      }
    });
  }
}