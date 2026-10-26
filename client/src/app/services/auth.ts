import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface CadastroRequest {
  nome: string;
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private readonly apiUrl = 'http://localhost:5146/auth';

  constructor(private http: HttpClient) {}

  cadastrar(request: CadastroRequest) {
    return this.http.post(`${this.apiUrl}/cadastro`, request);
  }
}
