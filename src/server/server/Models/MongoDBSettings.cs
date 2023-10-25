namespace Server.Models;

public class MongoDBSettings
{
    public string ConnectionString { get; set; } = null!;
    public string DatabaseName { get; set; } = null!;
    public string DocumentsCollectionName { get; set; } = null!;
}
