import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CriarNotaRequest, NotaDto } from './notas.models';

@Injectable({
  providedIn: 'root'
})
export class NotasService {
  private readonly apiUrl = 'http://localhost:5146/notas';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<NotaDto[]>(this.apiUrl);
  }

  criar(request: CriarNotaRequest) {
    return this.http.post<NotaDto>(this.apiUrl, request);
  }
}