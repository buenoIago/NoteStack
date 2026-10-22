using Microsoft.EntityFrameworkCore;
using NoteStack.Dominio.Compartilhado;
using NoteStack.Infraestrutura.Compartilhado.Orm;

namespace NoteStack.Infraestrutura.Compartilhado.Auth;

public sealed class RevogacaoTokenEmOrm(NoteStackDbContext db) : IRevogacaoToken
{
    public async Task RevogarAsync(string jti, DateTime expiracaoUtc, CancellationToken ct)
    {
        if (!await EstaRevogadoAsync(jti, ct))
            db.TokensRevogados.Add(new TokenRevogado { Jti = jti, ExpiraEmUtc = expiracaoUtc });

        await db.TokensRevogados.Where(x => x.ExpiraEmUtc <= DateTime.UtcNow).ExecuteDeleteAsync(ct);
        await db.SaveChangesAsync(ct);
    }

    public async Task<bool> EstaRevogadoAsync(string jti, CancellationToken ct)
    {
        return await db.TokensRevogados.AnyAsync(x => x.Jti == jti, ct);
    }
}
