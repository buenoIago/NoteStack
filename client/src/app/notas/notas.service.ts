import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface CategoriaDto {
  id: string;
  titulo: string;
}

export interface NotaDto {
  id: string;
  titulo: string;
  descricao: string | null;
  status: string;
  categorias: CategoriaDto[];
  criadoEm: string;
  atualizadoEm: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotasService {
  private readonly apiUrl = 'http://localhost:5146/notas';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<NotaDto[]>(this.apiUrl);
  }
}
