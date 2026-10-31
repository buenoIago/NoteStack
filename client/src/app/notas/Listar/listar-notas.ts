import { Component } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NotaDto } from '../notas.models';
import { NotasService } from '../notas.service';

@Component({
  imports: [Navbar, DatePipe, RouterLink],
  selector: 'app-notas',
  templateUrl: './listar-notas.html',
})
export class Notas {
  notas: NotaDto[] = [];

  constructor(private notasService: NotasService) {
    this.carregarNotas();
  }

  carregarNotas() {
    this.notasService.listar().subscribe({
      next: (notas) => {
        this.notas = notas;
        console.log(notas);
      },
      error: (erro) => {
        console.error(erro);
      }
    });
  }

  excluir(nota: NotaDto) {
    const confirmouExclusao = confirm(
      `Deseja realmente excluir a nota "${nota.titulo}"?`
    );

    if (!confirmouExclusao) return;

    this.notasService.excluir(nota.id).subscribe({
      next: () => {
        this.carregarNotas();
      },
      error: (erro) => {
        console.error(erro);
      }
    });
  }
}