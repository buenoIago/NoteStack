using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace NoteStack.Infraestrutura.Compartilhado.Orm.Config;

public sealed class NoteStackUserConfiguration : IEntityTypeConfiguration<NoteStackUser>
{
    public void Configure(EntityTypeBuilder<NoteStackUser> builder)
    {
        builder.Property(usuario => usuario.Nome)
            .IsRequired();
    }
}
