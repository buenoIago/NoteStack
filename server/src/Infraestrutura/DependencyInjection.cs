using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NoteStack.Dominio.Compartilhado;
using NoteStack.Dominio.Modulos.Categorias;
using NoteStack.Dominio.Modulos.Notas;
using NoteStack.Infraestrutura.Compartilhado.Auth;
using NoteStack.Infraestrutura.Compartilhado.Orm;
using NoteStack.Infraestrutura.Modulos.Categorias;
using NoteStack.Infraestrutura.Modulos.Notas;

namespace NoteStack.Infraestrutura;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        var connection = configuration.GetConnectionString("SqlServer");
        if (string.IsNullOrWhiteSpace(connection))
        {
            throw new InvalidOperationException("Connection string \"SqlServer\" não configurada.");
        }

        services.AddDbContext<NoteStackDbContext>(options =>
            options.UseSqlServer(connection, sql => sql.EnableRetryOnFailure(3)));

        services.AddIdentityCore<NoteStackUser>(options =>
        {
            options.User.RequireUniqueEmail = true;

            options.Password.RequiredLength = 8;
            options.Password.RequireDigit = true;
            options.Password.RequireNonAlphanumeric = true;
            options.Password.RequireUppercase = false;
            options.Password.RequireLowercase = false;

            options.Lockout.MaxFailedAccessAttempts = 5;
            options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
            options.Lockout.AllowedForNewUsers = true;
        }).AddEntityFrameworkStores<NoteStackDbContext>();

        services.AddScoped<IGerenciadorIdentidade, GerenciadorIdentidade>();
        services.AddScoped<IRevogacaoToken, RevogacaoTokenEmOrm>();
        services.AddScoped<IRepositorioCategoria, RepositorioCategoriaEmOrm>();
        services.AddScoped<IRepositorioNota, RepositorioNotaEmOrm>();

        return services;
    }
}
