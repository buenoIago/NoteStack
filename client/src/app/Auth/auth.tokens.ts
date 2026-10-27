import { UsuarioDto } from './auth.models';

const ACCESS_TOKEN_KEY = 'accessToken';
const USUARIO_KEY = 'usuario';

export function obterAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function salvarAccessToken(accessToken: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function removerAccessToken(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function obterUsuario(): UsuarioDto | null {
  const usuario = localStorage.getItem(USUARIO_KEY);

  if (!usuario) {
    return null;
  }

  return JSON.parse(usuario);
}

export function salvarUsuario(usuario: UsuarioDto): void {
  localStorage.setItem(USUARIO_KEY, JSON.stringify(usuario));
}

export function removerUsuario(): void {
  localStorage.removeItem(USUARIO_KEY);
}