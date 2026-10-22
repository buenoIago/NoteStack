using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NoteStack.Dominio.Modulos.Categorias;

namespace NoteStack.Infraestrutura.Compartilhado.Orm.Config;

public sealed class CategoriaConfiguration : IEntityTypeConfiguration<Categoria>
{
    public void Configure(EntityTypeBuilder<Categoria> builder)
    {
        builder.HasKey(categoria => categoria.Id);

        builder.Property(categoria => categoria.Titulo)
            .HasMaxLength(Categoria.TamanhoMaximoTitulo)
            .IsRequired();

        builder.Property(categoria => categoria.TituloNormalizado)
            .HasMaxLength(Categoria.TamanhoMaximoTitulo)
            .IsRequired();

        builder.HasIndex(categoria => new { categoria.UsuarioId, categoria.TituloNormalizado })
            .IsUnique();

        builder.HasOne<NoteStackUser>()
            .WithMany()
            .HasForeignKey(categoria => categoria.UsuarioId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
