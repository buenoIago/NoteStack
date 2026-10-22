using FluentResults;
using MediatR;
using NoteStack.Aplicacao.Compartilhado;
using NoteStack.Dominio.Modulos.Categorias;

namespace NoteStack.Aplicacao.Modulos.Categorias;

public sealed record ListarCategoriasQuery(Guid UsuarioId)
    : IRequest<Result<IReadOnlyList<CategoriaDto>>>;

public sealed class ListarCategoriasQueryHandler(IRepositorioCategoria repositorio)
    : IRequestHandler<ListarCategoriasQuery, Result<IReadOnlyList<CategoriaDto>>>
{
    public async Task<Result<IReadOnlyList<CategoriaDto>>> Handle(ListarCategoriasQuery query, CancellationToken ct)
    {
        var categorias = await repositorio.ListarAsync(query.UsuarioId, ct);
        var resultado = categorias.Select(DtoMapper.ToDto).ToArray();

        return Result.Ok<IReadOnlyList<CategoriaDto>>(resultado);
    }
}
