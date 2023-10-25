using Microsoft.Extensions.Options;
using MongoDB.Driver;
using server.Models;
using Server.Models;

namespace Server.Services;

/// <summary>
/// Stellt Methoden zur Bearbeitung der Document Collection bereit.
/// Die Datenbank ist Single Source of Truth (SSOT).
/// </summary>
public class DocumentCollectionService
{
    private readonly IMongoCollection<Document> _collection;
    private const string _historyFileCreatedString = "Datei wurde erstellt.";

    public DocumentCollectionService(IOptions<MongoDBSettings> mongoDBSettings)
    {
        var mongoClient = new MongoClient(mongoDBSettings.Value.ConnectionString);
        var database = mongoClient.GetDatabase(mongoDBSettings.Value.DatabaseName);

        _collection = database.GetCollection<Document>(mongoDBSettings.Value.DocumentsCollectionName);
    }

    /// <summary>
    /// Gibt alle Dokumente aus, die auf den Filter passen.
    /// </summary>
    /// <param name="filter">Filter.</param>
    /// <returns>Eine Liste der zum Filter passenden Einträge.</returns>
    public async Task<IEnumerable<Document>> FindAsync(Func<Document, bool> filter)
    {
        return (await _collection.FindAsync(d => true)).ToEnumerable();
    }

    /// <summary>
    /// Fügt einen neuen Eintrag in der Datenbank ein.
    /// </summary>
    /// <param name="relativeFilePath">Pfad an dem die Datei gespeichert wurde, enthält den Dateinamen und Endung.</param>
    /// <param name="fileName">Anzeigename der Datei mit Dateiendung.</param>
    /// <returns>Das Ergebnis der Operation.</returns>
    public async Task<bool> AddAsync(string relativeFilePath, string fileName)
    {
        var histroyEntry = new HistoryEntry
        {
            Date = DateTime.Now,
            Description = _historyFileCreatedString,
            DocumentHash = "hash"
        };
        var document = new Document
        {
            FileName = fileName,
            RelativeFilePath = relativeFilePath,
            History = new[] { histroyEntry }
        };

        await _collection.InsertOneAsync(document);
        return true;
    }

    /// <summary>
    /// Fügt einem Dokument einen Tag hinzu.
    /// </summary>
    /// <param name="objectId">ObjectId des Dokuments.</param>
    /// <param name="tag">Tag, der hinzugefügt werden soll.</param>
    /// <returns>Das Ergebnis der Operation.</returns>
    public async Task<bool> AddTagAsync(string objectId, string tag)
    {
        var document = (await FindAsync(d => d.Id.ToString() == objectId)).First();

        if (document.Tags == null)
        {
            document.Tags = new[] { tag };
        }
        else
        {
            if (document.Tags.Contains(tag)) return false;
        }

        await _collection.ReplaceOneAsync(d => d.Id == document.Id, document);
        return true;
    }
}
