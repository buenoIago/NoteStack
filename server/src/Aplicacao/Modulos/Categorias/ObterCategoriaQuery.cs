using FluentResults;
using MediatR;
using NoteStack.Aplicacao.Compartilhado;
using NoteStack.Dominio.Compartilhado;
using NoteStack.Dominio.Modulos.Categorias;

namespace NoteStack.Aplicacao.Modulos.Categorias;

public sealed record ObterCategoriaQuery(Guid UsuarioId, Guid Id)
    : IRequest<Result<CategoriaDto>>;

public sealed class ObterCategoriaQueryHandler(IRepositorioCategoria repositorio)
    : IRequestHandler<ObterCategoriaQuery, Result<CategoriaDto>>
{
    public async Task<Result<CategoriaDto>> Handle(ObterCategoriaQuery query, CancellationToken ct)
    {
        var categoria = await repositorio.ObterAsync(query.Id, query.UsuarioId, ct);
        if (categoria is null)
        {
            return Result.Fail<CategoriaDto>(Erros.Criar(TipoErro.NaoEncontrado, "Categoria não encontrada."));
        }

        return Result.Ok(DtoMapper.ToDto(categoria));
    }
}
