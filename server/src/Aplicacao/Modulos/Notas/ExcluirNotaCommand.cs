using FluentResults;
using MediatR;
using NoteStack.Aplicacao.Compartilhado;
using NoteStack.Dominio.Compartilhado;
using NoteStack.Dominio.Modulos.Notas;

namespace NoteStack.Aplicacao.Modulos.Notas;

public sealed record ExcluirNotaCommand(Guid UsuarioId, Guid Id) : IRequest<Result>;

public sealed class ExcluirNotaCommandHandler(IRepositorioNota repositorio)
    : IRequestHandler<ExcluirNotaCommand, Result>
{
    public async Task<Result> Handle(ExcluirNotaCommand command, CancellationToken ct)
    {
        var nota = await repositorio.ObterAsync(command.Id, command.UsuarioId, ct);
        if (nota is null)
        {
            return Result.Fail(Erros.Criar(TipoErro.NaoEncontrado, "Nota não encontrada."));
        }

        await repositorio.ExcluirAsync(nota, ct);

        return Result.Ok();
    }
}
