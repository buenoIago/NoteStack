using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using NoteStack.Infraestrutura.Compartilhado.Orm;

namespace NoteStack.Api.Compartilhado.Orm;

public sealed class NoteStackDbContextFactory : IDesignTimeDbContextFactory<NoteStackDbContext>
{
    public NoteStackDbContext CreateDbContext(string[] args)
    {
        var configuration = new ConfigurationBuilder()
            .AddUserSecrets<NoteStackDbContextFactory>(optional: true)
            .AddEnvironmentVariables()
            .Build();

        var connection = configuration.GetConnectionString("SqlServer")
            ?? "Server=localhost;Database=NoteStackDb;User Id=sa;Password=CrieUmaSenhaForte@123!;TrustServerCertificate=True";

        var options = new DbContextOptionsBuilder<NoteStackDbContext>()
            .UseSqlServer(connection)
            .Options;

        return new NoteStackDbContext(options);
    }
}
