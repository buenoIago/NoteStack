import { CategoriaDto } from '../categorias/categorias.models';

export interface NotaDto {
  id: string;
  titulo: string;
  descricao: string | null;
  status: string;
  categorias: CategoriaDto[];
  criadoEm: string;
  atualizadoEm: string;
}

export interface CriarNotaRequest {
  titulo: string;
  descricao: string | null;
  categoriaIds: string[];
}

export interface AtualizarNotaRequest {
  titulo: string;
  descricao: string | null;
  status: string;
  categoriaIds: string[];
}