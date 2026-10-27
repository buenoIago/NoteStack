import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriaDto, CategoriaRequest } from './categorias.models';

@Injectable({ providedIn: 'root' })
export class CategoriasService {
  private readonly apiUrl = 'http://localhost:5146/categorias';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<CategoriaDto[]>(this.apiUrl);
  }

  obterPorId(id: string) {
    return this.http.get<CategoriaDto>(`${this.apiUrl}/${id}`);
  }

  cadastrar(request: CategoriaRequest) {
    return this.http.post<CategoriaDto>(this.apiUrl, request);
  }
}