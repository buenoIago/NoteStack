import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';
import { CategoriaDto } from '../../categorias/categorias.models';
import { CategoriasService } from '../../categorias/categorias.service';
import { NotasService } from '../notas.service';
import { CriarNotaRequest } from '../notas.models';

@Component({
  imports: [Navbar, RouterLink, FormsModule],
  selector: 'app-cadastrar-nota',
  templateUrl: './cadastrar-nota.html',
})
export class CadastrarNota {
  titulo = '';
  descricao = '';

  categorias: CategoriaDto[] = [];
  categoriaIds: string[] = [];

  constructor(
    private categoriasService: CategoriasService,
    private notasService: NotasService,
    private router: Router
  ) {
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

  selecionarCategoria(id: string) {
    if (this.categoriaIds.includes(id)) {
      this.categoriaIds = this.categoriaIds.filter(
        (categoriaId) => categoriaId !== id
      );

      return;
    }

    this.categoriaIds.push(id);
  }

  categoriaSelecionada(id: string) {
    return this.categoriaIds.includes(id);
  }

  cadastrar() {
    const request: CriarNotaRequest = {
      titulo: this.titulo,
      descricao: this.descricao || null,
      categoriaIds: this.categoriaIds
    };

    this.notasService.criar(request).subscribe({
      next: () => {
        this.router.navigate(['/notas']);
      },
      error: (erro) => {
        console.error(erro);
      }
    });
  }
}