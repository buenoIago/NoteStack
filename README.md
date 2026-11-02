# NoteStack

[![.NET](https://img.shields.io/badge/.NET-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![OpenAPI / Swagger](https://img.shields.io/badge/OpenAPI%20%2F%20Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)
[![Entity Framework Core](https://img.shields.io/badge/Entity%20Framework%20Core-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)](https://learn.microsoft.com/ef/core/)
[![ASP.NET Core Identity](https://img.shields.io/badge/ASP.NET%20Core%20Identity-512BD4?style=for-the-badge&logo=dotnet&logoColor=white)](https://learn.microsoft.com/aspnet/core/security/authentication/identity)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Lucide Icons](https://img.shields.io/badge/Lucide%20Icons-F56565?style=for-the-badge&logo=lucide&logoColor=white)](https://lucide.dev/)

## Introdução

O NoteStack é uma aplicação para registrar e organizar anotações em um só lugar. A proposta é ajudar o usuário a guardar ideias e informações importantes de forma simples e fácil de encontrar. Para isso, as informações são organizadas em categorias e notas.

## Funcionalidades

- **Autenticação:** cadastro, login e gerenciamento de sessão dos usuários.
- **Notas:** criação, visualização, edição e exclusão de anotações.
- **Categorias:** criação, visualização, edição e exclusão de categorias.
- **Organização:** associação de notas às respectivas categorias e filtragem por categoria.
- **Arquivamento:** gerenciamento do estado das anotações, entre ativas e arquivadas.
- **Isolamento de dados:** cada usuário acessa somente suas próprias notas e categorias.

## Tecnologias utilizadas

### Front-end

- Angular
- TypeScript
- Tailwind CSS
- Lucide Icons

### Back-end

- C#
- .NET 10
- ASP.NET Core
- Entity Framework Core
- MediatR
- FluentResults
- JWT
- ASP.NET Core Identity

### Banco de dados e infraestrutura

- SQL Server
- Docker
- RabbitMQ

## Estrutura do projeto

```text
NoteStack/
├── client/                         # Aplicação Angular
│   ├── public/                     # Arquivos públicos
│   ├── src/
│   │   ├── app/                    # Componentes, páginas e serviços
│   │   ├── environments/           # Configurações de ambiente
│   │   ├── index.html
│   │   ├── main.ts                 # Inicialização do Angular
│   │   └── styles.css              # Estilos globais
│   ├── angular.json
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
│
├── server/                         # API .NET
│   ├── src/
│   │   ├── Api/
│   │   ├── Aplicacao/
│   │   ├── Dominio/
│   │   └── Infraestrutura/
│   └── docker-compose.yml
│
└── README.md
```

## Como executar

### Requisitos

Antes de começar, certifique-se de ter instalado:

- [Git](https://git-scm.com/)
- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- [Node.js](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### 1. Clone o repositório

```bash
git clone https://github.com/buenoIago/NoteStack.git
cd NoteStack
```

### 2. Inicie os serviços com Docker

Entre na pasta `server`:

```bash
cd server
```

Inicie o SQL Server e o RabbitMQ:

```bash
docker compose up -d
```

Os serviços estarão disponíveis em:

- **SQL Server:** `localhost:1433`
- **RabbitMQ:** `localhost:5672`
- **Painel do RabbitMQ:** `http://localhost:15672`

Acesse o painel do RabbitMQ utilizando as credenciais configuradas no Docker Compose.

### 3. Configure os User Secrets da API

Volte para a raiz do projeto:

```bash
cd ..
```

Configure a connection string do SQL Server:

```bash
dotnet user-secrets set "ConnectionStrings:SqlServer" "Server=localhost,1433;Database=NoteStackDb;User Id=sa;Password=<SENHA_DO_SQL_SERVER>;TrustServerCertificate=True" --project server/src/Api/NoteStack.Api.csproj
```

Configure a chave JWT, que deve possuir pelo menos 32 bytes:

```bash
dotnet user-secrets set "Jwt:SigningKey" "<SUA_CHAVE_JWT>" --project server/src/Api/NoteStack.Api.csproj
```

Configure a chave de licença do MediatR/Lucky Penny, caso exigida pela configuração do projeto:

```bash
dotnet user-secrets set "LuckyPenny:LicenseKey" "<SUA_CHAVE_DE_LICENCA>" --project server/src/Api/NoteStack.Api.csproj
```

Substitua os valores entre `< >` pelas suas próprias configurações.

### 4. Restaure as ferramentas e atualize o banco de dados

Restaure as ferramentas .NET:

```bash
dotnet tool restore --tool-manifest server/dotnet-tools.json
```

Aplique as migrations:

```bash
dotnet ef database update --project server/src/Infraestrutura/NoteStack.Infraestrutura.csproj --startup-project server/src/Api/NoteStack.Api.csproj
```

### 5. Execute a API

```bash
dotnet run --project server/src/Api/NoteStack.Api.csproj
```

A API estará disponível em:

`http://localhost:5146`

A documentação Swagger pode ser acessada em:

`http://localhost:5146/swagger`

### 6. Execute o front-end

Abra outro terminal, na raiz do projeto, e entre na pasta `client`:

```bash
cd client
```

Instale as dependências:

```bash
npm ci
```

Inicie a aplicação:

```bash
npm start
```

O front-end estará disponível em:

`http://localhost:4200`

## Acesso à aplicação

A versão publicada do front-end pode ser acessada pelo GitHub Pages:

[https://buenoiago.github.io/NoteStack/](https://buenoiago.github.io/NoteStack/)

Para utilizar todas as funcionalidades da aplicação publicada, a API também precisa estar hospedada e acessível pela internet.

---

Desenvolvido por **Iago Pereira**.