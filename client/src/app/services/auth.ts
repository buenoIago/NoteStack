import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface CadastroRequest {
  nome: string;
  email: string;
  senha: string;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface TokenDto {
  usuarioId: string;
  nome: string;
  email: string;
  accessToken: string;
  dataExpiracaoEmUtc: string;
}

export interface UsuarioDto {
  id: string;
  nome: string;
  email: string;
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

  login(request: LoginRequest) {
  return this.http.post<TokenDto>(`${this.apiUrl}/login`, request);
  }

  me() {
  return this.http.get<UsuarioDto>(`${this.apiUrl}/me`);
  }

  logout() {
  return this.http.post<void>(`${this.apiUrl}/logout`, {});
  }
}
