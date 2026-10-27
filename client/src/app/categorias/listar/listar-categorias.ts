import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Navbar } from '../../shared/navbar/navbar';
import { CategoriaDto } from '../categorias.models';
import { CategoriasService } from '../categorias.service';

@Component({
  imports: [Navbar, RouterLink],
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.html',
})
export class ListarCategorias {
  categorias: CategoriaDto[] = [];

  constructor(private categoriasService: CategoriasService) {
    this.carregarCategorias();
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