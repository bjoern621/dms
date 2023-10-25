using MongoDB.Bson;

namespace Server.Models;

public class Document
{
    public ObjectId Id { get; set; }
    public string? FileName { get; set; }
    public string? RelativeFilePath { get; set; }
    public string[]? Tags { get; set; }
    public HistoryEntry[]? History { get; set; }
}

public class HistoryEntry
{
    public required DateTime Date { get; set; }
    public required string Description { get; set; }
    public required string DocumentHash { get; set; }
}