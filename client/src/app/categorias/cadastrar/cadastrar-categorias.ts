import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { form, FormField, maxLength, required } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';
import { CategoriaRequest } from '../categorias.models';
import { CategoriasService } from '../categorias.service';

export interface CategoriaFormModel {
  readonly titulo: string;
}

@Component({
  imports: [Navbar, FormField, RouterLink],
  selector: 'app-cadastrar-categorias',
  templateUrl: './cadastrar-categorias.html',
})
export class CadastrarCategoria {
  private readonly categoriasService = inject(CategoriasService);
  private readonly router = inject(Router);

  protected readonly enviandoFormulario = signal(false);
  protected readonly mensagemErro = signal('');

  protected readonly modeloCategoria = signal<CategoriaFormModel>({
    titulo: '',
  });

  protected readonly formularioCategoria = form(this.modeloCategoria, (modelo) => {
    required(modelo.titulo, { message: 'Informe o título da categoria.' });
    maxLength(modelo.titulo, 200, { message: 'O título pode ter no máximo 200 caracteres.' });
  });

  protected cadastrarCategoria(event: SubmitEvent): void {
    event.preventDefault();

    const formulario = this.formularioCategoria();

    if (formulario.invalid()) {
      formulario.markAsTouched();
      return;
    }

    const modelo = this.modeloCategoria();

    const request: CategoriaRequest = {
      titulo: modelo.titulo.trim(),
    };

    this.enviandoFormulario.set(true);
    this.mensagemErro.set('');

    this.categoriasService.cadastrar(request).subscribe({
      next: () => {
        this.enviandoFormulario.set(false);

        void this.router.navigateByUrl('/categorias');
      },
      error: (erro: HttpErrorResponse) => {
        console.error(erro);

        this.mensagemErro.set('Não foi possível cadastrar a categoria.');
        this.enviandoFormulario.set(false);
      },
    });
  }
}