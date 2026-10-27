import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';
import { NotaDto } from '../../notas/notas.models';
import { NotasService } from '../../notas/notas.service';
import { CategoriaDto } from '../categorias.models';
import { CategoriasService } from '../categorias.service';

@Component({
  imports: [Navbar, RouterLink, DatePipe],
  selector: 'app-detalhes-categorias',
  templateUrl: './detalhes-categorias.html',
})
export class DetalhesCategorias {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly categoriasService = inject(CategoriasService);
  private readonly notasService = inject(NotasService);

  protected readonly categoria = signal<CategoriaDto | null>(null);
  protected readonly notas = signal<NotaDto[]>([]);
  protected readonly carregando = signal(true);
  protected readonly excluindo = signal(false);
  protected readonly mensagemErro = signal('');

  constructor() {
    const categoriaId = this.route.snapshot.paramMap.get('categoriaId');

    if (!categoriaId) {
      this.mensagemErro.set('Identificador da categoria inválido.');
      this.carregando.set(false);
      return;
    }

    this.categoriasService.obterPorId(categoriaId).subscribe({
      next: (categoria) => {
        this.categoria.set(categoria);
        this.carregarNotas(categoria.id);
      },
      error: (erro: HttpErrorResponse) => {
        console.error(erro);

        this.mensagemErro.set('Não foi possível carregar a categoria.');
        this.carregando.set(false);
      },
    });
  }

  private carregarNotas(categoriaId: string): void {
    this.notasService.listar().subscribe({
      next: (notas) => {
        const notasDaCategoria = notas.filter((nota) =>
          nota.categorias.some((categoria) => categoria.id === categoriaId)
        );

        this.notas.set(notasDaCategoria);
        this.carregando.set(false);
      },
      error: (erro: HttpErrorResponse) => {
        console.error(erro);

        this.mensagemErro.set('Não foi possível carregar as notas da categoria.');
        this.carregando.set(false);
      },
    });
  }

  protected excluirCategoria(): void {
    const categoria = this.categoria();

    if (!categoria) return;

    const confirmouExclusao = confirm(
      `Deseja realmente excluir a categoria "${categoria.titulo}"?`
    );

    if (!confirmouExclusao) return;

    this.excluindo.set(true);
    this.mensagemErro.set('');

    this.categoriasService.excluir(categoria.id).subscribe({
      next: () => {
        this.excluindo.set(false);

        void this.router.navigateByUrl('/categorias');
      },
      error: (erro: HttpErrorResponse) => {
        console.error(erro);

        this.mensagemErro.set('Não foi possível excluir a categoria.');
        this.excluindo.set(false);
      },
    });
  }
}