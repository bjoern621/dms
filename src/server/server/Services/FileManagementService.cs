namespace Server.Services;

/// <summary>
/// Bietet Zugang zu gespeicherten Dateien im Dateisystem.
/// Die Datenbank ist zwar SSOT, <see cref="FileManagementService"/> sollte allerdings
/// keine inkonsistenten Dateien löschen, um Datenverlust zu verhindenen.
/// </summary>
public class FileManagementService
{
    private readonly string _rootPath;

    public FileManagementService(string? rootPath)
    {
        rootPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments), "documents");
        _rootPath = rootPath;
    }

    /// <summary>
    /// Eine Datei wird im Dateisystem abgelegt.yy
    /// </summary>
    /// <param name="relativeFilePath">Der Pfad an dem die Datei gespeichert werden soll, mit Dateinamen und Endung.</param>
    /// <param name="content">Die Datei als IFormFile.</param>
    /// <returns>Das Ergebnis der Operation.</returns>
    public bool AddFile(string relativeFilePath, IFormFile content)
    {
        var filePath = Path.Combine(_rootPath, relativeFilePath);

        if (File.Exists(filePath)) return false;

        using (var fileStream = new FileStream(filePath, FileMode.Create))
        {
            content.CopyTo(fileStream);
        }

        return true;
    }

    /// <summary>
    /// Löscht eine Datei aus dem Dateisystem, wenn eine existiert.
    /// </summary>
    /// <param name="relativePath">Der Pfad an dem eine Datei gelöscht werden soll.</param>
    /// <returns>Das Ergebnis der Operation.</returns>
    public bool DeleteFile(string relativePath)
    {
        if (!File.Exists(relativePath)) return false;

        if(Directory.Exists(relativePath)) return false;

        try
        {
            File.Delete(relativePath);

            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }
}
