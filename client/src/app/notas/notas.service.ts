import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AtualizarNotaRequest, CriarNotaRequest, NotaDto } from './notas.models';

@Injectable({ providedIn: 'root' })
export class NotasService {
  private readonly apiUrl = 'http://localhost:5146/notas';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<NotaDto[]>(this.apiUrl);
  }

  obterPorId(id: string) {
    return this.http.get<NotaDto>(`${this.apiUrl}/${id}`);
  }

  criar(request: CriarNotaRequest) {
    return this.http.post<NotaDto>(this.apiUrl, request);
  }

  editar(id: string, request: AtualizarNotaRequest) {
    return this.http.put<NotaDto>(`${this.apiUrl}/${id}`, request);
  }

  excluir(id: string) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}