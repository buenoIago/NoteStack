import { Component, signal } from '@angular/core';
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
  categorias = signal<CategoriaDto[]>([]);

  carregando = signal(false);
  mensagemErro = signal<string | null>(null);

  constructor(private categoriasService: CategoriasService) {
    this.carregarCategorias();
  }

  carregarCategorias() {
    this.carregando.set(true);
    this.mensagemErro.set(null);

    this.categoriasService.listar().subscribe({
      next: (categorias) => {
        this.categorias.set(categorias);
        this.carregando.set(false);
      },
      error: (erro) => {
        console.error(erro);

        this.mensagemErro.set('Não foi possível carregar as categorias.');
        this.carregando.set(false);
      }
    });
  }
}