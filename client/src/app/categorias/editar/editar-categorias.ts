import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { form, FormField, maxLength, required } from '@angular/forms/signals';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';
import { CategoriaRequest } from '../categorias.models';
import { CategoriasService } from '../categorias.service';

export interface CategoriaFormModel {
  readonly titulo: string;
}

@Component({
  imports: [Navbar, FormField, RouterLink],
  selector: 'app-editar-categorias',
  templateUrl: './editar-categorias.html',
})
export class EditarCategorias {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly categoriasService = inject(CategoriasService);

  protected readonly categoriaId = this.route.snapshot.paramMap.get('categoriaId');

  protected readonly carregando = signal(true);
  protected readonly enviandoFormulario = signal(false);
  protected readonly mensagemErro = signal('');

  protected readonly modeloCategoria = signal<CategoriaFormModel>({
    titulo: '',
  });

  protected readonly formularioCategoria = form(this.modeloCategoria, (modelo) => {
    required(modelo.titulo, { message: 'Informe o título da categoria.' });
    maxLength(modelo.titulo, 200, { message: 'O título pode ter no máximo 200 caracteres.' });
  });

  constructor() {
    if (!this.categoriaId) {
      this.mensagemErro.set('Identificador da categoria inválido.');
      this.carregando.set(false);
      return;
    }

    this.categoriasService.obterPorId(this.categoriaId).subscribe({
      next: (categoria) => {
        this.modeloCategoria.set({
          titulo: categoria.titulo,
        });

        this.carregando.set(false);
      },
      error: (erro: HttpErrorResponse) => {
        console.error(erro);

        this.mensagemErro.set('Não foi possível carregar a categoria.');
        this.carregando.set(false);
      },
    });
  }

  protected editarCategoria(event: SubmitEvent): void {
    event.preventDefault();

    const formulario = this.formularioCategoria();

    if (formulario.invalid()) {
      formulario.markAsTouched();
      return;
    }

    if (!this.categoriaId) return;

    const modelo = this.modeloCategoria();

    const request: CategoriaRequest = {
      titulo: modelo.titulo.trim(),
    };

    this.enviandoFormulario.set(true);
    this.mensagemErro.set('');

    this.categoriasService.editar(this.categoriaId, request).subscribe({
      next: () => {
        this.enviandoFormulario.set(false);

        void this.router.navigateByUrl(`/categorias/${this.categoriaId}`);
      },
      error: (erro: HttpErrorResponse) => {
        console.error(erro);

        this.mensagemErro.set('Não foi possível editar a categoria.');
        this.enviandoFormulario.set(false);
      },
    });
  }
}