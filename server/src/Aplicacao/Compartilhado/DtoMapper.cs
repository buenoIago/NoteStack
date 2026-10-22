using NoteStack.Dominio.Modulos.Categorias;
using NoteStack.Dominio.Modulos.Notas;

namespace NoteStack.Aplicacao.Compartilhado;

public static class DtoMapper
{
    public static CategoriaDto ToDto(Categoria categoria)
    {
        return new CategoriaDto(categoria.Id, categoria.Titulo);
    }

    public static NotaDto ToDto(Nota nota)
    {
        var categorias = nota.NotasCategorias
            .Select(associacao => ToDto(associacao.Categoria))
            .ToArray();

        return new NotaDto(
            nota.Id,
            nota.Titulo,
            nota.Descricao,
            nota.Status.ToString(),
            categorias,
            nota.CriadoEm,
            nota.AtualizadoEm
        );
    }
}
