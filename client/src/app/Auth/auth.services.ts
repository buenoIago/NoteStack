import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';

import {
  CadastroRequest,
  LoginRequest,
  TokenDto,
  UsuarioDto
} from './auth.models';

import {
  obterAccessToken,
  obterUsuario,
  removerAccessToken,
  removerUsuario,
  salvarAccessToken,
  salvarUsuario
} from './auth.tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:5146/auth';

  readonly sessao = signal<UsuarioDto | null>(obterUsuario());

  constructor(private http: HttpClient) {
    this.carregarSessao();
  }

  cadastrar(request: CadastroRequest) {
    return this.http.post(`${this.apiUrl}/cadastro`, request);
  }

  login(request: LoginRequest) {
    return this.http.post<TokenDto>(`${this.apiUrl}/login`, request).pipe(
      tap((token) => {
        const usuario: UsuarioDto = {
          id: token.usuarioId,
          nome: token.nome,
          email: token.email
        };

        salvarAccessToken(token.accessToken);
        salvarUsuario(usuario);

        this.sessao.set(usuario);
      })
    );
  }

  me() {
    return this.http.get<UsuarioDto>(`${this.apiUrl}/me`);
  }

  logout() {
    return this.http.post<void>(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        removerAccessToken();
        removerUsuario();

        this.sessao.set(null);
      })
    );
  }

  carregarSessao() {
    const accessToken = obterAccessToken();

    if (!accessToken) {
      removerUsuario();
      this.sessao.set(null);

      return;
    }

    this.me().subscribe({
      next: (usuario) => {
        salvarUsuario(usuario);
        this.sessao.set(usuario);
      },
      error: () => {
        removerAccessToken();
        removerUsuario();

        this.sessao.set(null);
      }
    });
  }
}