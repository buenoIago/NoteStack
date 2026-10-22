using NoteStack.Dominio.Modulos.Notas;

namespace NoteStack.Aplicacao.Modulos.Notas;

internal static class StatusNotaParser
{
    internal static bool TryParse(string? status, out StatusNota resultado)
    {
        return Enum.TryParse(status, ignoreCase: true, out resultado)
            && Enum.IsDefined(resultado);
    }
}
