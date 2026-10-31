import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { form, FormField, maxLength, required } from '@angular/forms/signals';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';
import { CategoriaDto } from '../../categorias/categorias.models';
import { CategoriasService } from '../../categorias/categorias.service';
import { AtualizarNotaRequest } from '../notas.models';
import { NotasService } from '../notas.service';

export interface NotaFormModel {
  readonly titulo: string;
  readonly descricao: string;
  readonly status: string;
}

@Component({
  imports: [Navbar, FormField, RouterLink],
  selector: 'app-editar-nota',
  templateUrl: './editar-nota.html',
})
export class EditarNota {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly categoriasService = inject(CategoriasService);
  private readonly notasService = inject(NotasService);

  protected readonly notaId = this.route.snapshot.paramMap.get('notaId');

  protected readonly categorias = signal<CategoriaDto[]>([]);
  protected readonly categoriaIds = signal<string[]>([]);

  protected readonly carregando = signal(true);
  protected readonly enviandoFormulario = signal(false);
  protected readonly mensagemErro = signal('');

  protected readonly modeloNota = signal<NotaFormModel>({
    titulo: '',
    descricao: '',
    status: 'Ativa',
  });

  protected readonly formularioNota = form(this.modeloNota, (modelo) => {
    required(modelo.titulo, { message: 'Informe o título da nota.' });
    maxLength(modelo.titulo, 200, { message: 'O título pode ter no máximo 200 caracteres.' });
  });

  constructor() {
    if (!this.notaId) {
      this.mensagemErro.set('Identificador da nota inválido.');
      this.carregando.set(false);
      return;
    }

    this.categoriasService.listar().subscribe({
      next: (categorias) => {
        this.categorias.set(categorias);
        this.carregarNota();
      },
      error: (erro: HttpErrorResponse) => {
        console.error(erro);

        this.mensagemErro.set('Não foi possível carregar as categorias.');
        this.carregando.set(false);
      },
    });
  }

  private carregarNota(): void {
    if (!this.notaId) return;

    this.notasService.obterPorId(this.notaId).subscribe({
      next: (nota) => {
        this.modeloNota.set({
          titulo: nota.titulo,
          descricao: nota.descricao ?? '',
          status: nota.status,
        });

        this.categoriaIds.set(
          nota.categorias.map((categoria) => categoria.id)
        );

        this.carregando.set(false);
      },
      error: (erro: HttpErrorResponse) => {
        console.error(erro);

        this.mensagemErro.set('Não foi possível carregar a nota.');
        this.carregando.set(false);
      },
    });
  }

  protected selecionarCategoria(id: string): void {
    if (this.categoriaIds().includes(id)) {
      this.categoriaIds.update((categoriaIds) =>
        categoriaIds.filter((categoriaId) => categoriaId !== id)
      );

      return;
    }

    this.categoriaIds.update((categoriaIds) => [
      ...categoriaIds,
      id
    ]);
  }

  protected categoriaSelecionada(id: string): boolean {
    return this.categoriaIds().includes(id);
  }

  protected editarNota(event: SubmitEvent): void {
    event.preventDefault();

    const formulario = this.formularioNota();

    if (formulario.invalid()) {
      formulario.markAsTouched();
      return;
    }

    if (!this.notaId) return;

    const modelo = this.modeloNota();

    const request: AtualizarNotaRequest = {
      titulo: modelo.titulo.trim(),
      descricao: modelo.descricao.trim() || null,
      status: modelo.status,
      categoriaIds: this.categoriaIds(),
    };

    this.enviandoFormulario.set(true);
    this.mensagemErro.set('');

    this.notasService.editar(this.notaId, request).subscribe({
      next: () => {
        this.enviandoFormulario.set(false);

        void this.router.navigateByUrl('/notas');
      },
      error: (erro: HttpErrorResponse) => {
        console.error(erro);

        this.mensagemErro.set('Não foi possível editar a nota.');
        this.enviandoFormulario.set(false);
      },
    });
  }
}