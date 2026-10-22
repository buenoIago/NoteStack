using FluentResults;
using MediatR;
using NoteStack.Aplicacao.Compartilhado;
using NoteStack.Dominio.Compartilhado;
using NoteStack.Dominio.Modulos.Categorias;

namespace NoteStack.Aplicacao.Modulos.Categorias;

public sealed record ExcluirCategoriaCommand(Guid UsuarioId, Guid Id) : IRequest<Result>;

public sealed class ExcluirCategoriaCommandHandler(IRepositorioCategoria repositorio)
    : IRequestHandler<ExcluirCategoriaCommand, Result>
{
    public async Task<Result> Handle(ExcluirCategoriaCommand command, CancellationToken ct)
    {
        var categoria = await repositorio.ObterAsync(command.Id, command.UsuarioId, ct);
        if (categoria is null)
        {
            return Result.Fail(Erros.Criar(TipoErro.NaoEncontrado, "Categoria não encontrada."));
        }

        await repositorio.ExcluirAsync(categoria, ct);

        return Result.Ok();
    }
}
