import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriaDto } from './categorias.models';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private readonly apiUrl = 'http://localhost:5146/categorias';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<CategoriaDto[]>(this.apiUrl);
  }
}