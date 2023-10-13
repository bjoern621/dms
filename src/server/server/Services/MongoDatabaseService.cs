using Microsoft.Extensions.Options;
using MongoDB.Driver;
using server.Models;

namespace server.Services;

public interface IMongoDatabaseService
{
    IMongoCollection<Document> DocumentsCollection { get; }
}

public class MongoDatabaseService : IMongoDatabaseService
{
    IMongoCollection<Document> IMongoDatabaseService.DocumentsCollection { get => DocumentsCollection; }

    private readonly IMongoCollection<Document> DocumentsCollection;

    public MongoDatabaseService(IOptions<MongoDBSettings> mongoDBSettings)
    {
        var mongoClient = new MongoClient(mongoDBSettings.Value.ConnectionString);
        var database = mongoClient.GetDatabase(mongoDBSettings.Value.DatabaseName);

        DocumentsCollection = database.GetCollection<Document>(mongoDBSettings.Value.DocumentsCollectionName);
    }
}