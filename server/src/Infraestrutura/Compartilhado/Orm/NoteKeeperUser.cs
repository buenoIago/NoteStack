using Microsoft.AspNetCore.Identity;

namespace NoteStack.Infraestrutura.Compartilhado.Orm;

public sealed class NoteStackUser : IdentityUser<Guid>
{
    public string Nome { get; set; } = string.Empty;
}
