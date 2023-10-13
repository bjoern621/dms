using MongoDB.Driver;
using server.Models;
using server.Services;

namespace server;

public class DocumentImporter
{
    private readonly IMongoCollection<Document> _collection;

    public DocumentImporter(IMongoDatabaseService databaseService)
    {
        _collection = databaseService.DocumentsCollection;
    }

    public void ImportDocuments()
    {
        ImportDocumentsRecursive(Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments), "documents"));
    }

    private void ImportDocumentsRecursive(string path)
    {
        if (!Directory.Exists(path)) Directory.CreateDirectory(path);

        foreach (var filePath in Directory.GetFiles(path))
        {
            if (_collection.Find(d => d.FilePath == filePath).Any()) continue;

            _collection.InsertOne(new Document { FilePath = filePath });
        }

        foreach (var dirPath in Directory.GetDirectories(path))
        {
            ImportDocumentsRecursive(dirPath);
        }
    }
}
