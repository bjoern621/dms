using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using server.DTO.Response;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentListController : ControllerBase
    {
        private IMongoCollection<Document> _collection;

        public DocumentListController(IMongoDatabaseService databaseService)
        {
            _collection = databaseService.DocumentsCollection;
        }

        /// <summary>
        /// Gibt grundlegende Informationen aller Dokumente in der Datenbank zurück.
        /// </summary>
        [HttpGet]
        public IEnumerable<DocumentListViewModel> Get()
        {
            return _collection
                .Find(d => true).ToEnumerable()
                .Select(d => new DocumentListViewModel
                {
                    DocumentName = d.FilePath == null ? "" : d.FilePath.Substring(d.FilePath.LastIndexOf('\\') + 1),
                    CreationDate = (d.History == null || d.History.First() == null || d.History.First().Date == null) ? DateOnly.FromDateTime(DateTime.Now) : DateOnly.FromDateTime(d.History.First().Date.Value)
                })
                .ToArray();
        }
    }
}
