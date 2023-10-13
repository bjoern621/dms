using MongoDB.Bson;

namespace server.Models;

public class Document
{
    public ObjectId Id { get; set; }
    public string? FilePath { get; set; }
    public string? Description { get; set; }
    public string[]? Tags { get; set; }
    public HistoryEntry[]? History { get; set; }
}

public class HistoryEntry
{
    public DateTime? Date { get; set; }
}