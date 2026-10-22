using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NoteStack.Dominio.Modulos.Categorias;
using NoteStack.Dominio.Modulos.Notas;

namespace NoteStack.Infraestrutura.Compartilhado.Orm;

public sealed class NoteStackDbContext(DbContextOptions<NoteStackDbContext> options)
    : IdentityUserContext<NoteStackUser, Guid>(options)
{
    public DbSet<Categoria> Categorias => Set<Categoria>();
    public DbSet<Nota> Notas => Set<Nota>();
    public DbSet<NotaCategoria> NotasCategorias => Set<NotaCategoria>();
    public DbSet<TokenRevogado> TokensRevogados => Set<TokenRevogado>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(NoteStackDbContext).Assembly);
    }
}
