using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Server.DTO.Response;
using Server.Services;

namespace Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class DocumentListController : ControllerBase
{
    private readonly DocumentCollectionService _documentCollection;
    private FileManagementService _fileManagement;

    public DocumentListController(DocumentCollectionService documentCollection, FileManagementService fileManagementService)
    {
        _documentCollection = documentCollection;
        _fileManagement = fileManagementService;
    }

    /// <summary>
    /// Fragt alle Dokumente in der Datenbank ab und wandelt diese in <see cref="DocumentListViewModel"/> um.
    /// </summary>
    /// <returns>Liste aller Dokumente in der Datenbank als <see cref="DocumentListViewModel"/>.</returns>
    [HttpGet]
    public async Task<IEnumerable<DocumentListViewModel>> GetAsync()
    {
        return (await _documentCollection.FindAsync(d => true))
            .Select(d => new DocumentListViewModel
            {
                DocumentName = d.FileName,
                CreationDate = d.History != null ? DateOnly.FromDateTime(d.History.First().Date) : DateOnly.MaxValue
            })
            .ToArray();
    }

    /// <summary>
    /// Legt neue Dateien in der Datenbank und im Dateisystem ab.
    /// Der Dateiname wird in eine eindeutige UUID geändert.
    /// </summary>
    /// <returns><see cref="IActionResult"/> mit Message.</returns>
    [HttpPost]
    public async Task<IActionResult> PostAsync()
    {
        await Console.Out.WriteLineAsync("test");
        foreach (var item in await Request.ReadFormAsync())
        {
            await Console.Out.WriteLineAsync(item.Key);
        }
        IFormFileCollection files = (await Request.ReadFormAsync()).Files;

        foreach (IFormFile file in files)
        {
            string relativePath = "";
            string originalFileName = file.FileName;
            string fileExtension = file.FileName.Substring(file.FileName.LastIndexOf('.'));
            string newFileName = Guid.NewGuid().ToString() + fileExtension;
            string relativeFilePath = Path.Combine(relativePath, newFileName);

            if(!_fileManagement.AddFile(relativeFilePath, file)) return BadRequest(new
            {
                Message = "Datei konnte nicht im Dateisystem gespeichert werden"
            });

            if (!await _documentCollection.AddAsync(relativeFilePath, originalFileName)) return BadRequest(new
            {
                Message = "Datei konnte nicht in der Datenbank gespeichert werden"
            });
        }

        return Accepted(new
        {
            Message = "Datei gespeichert"
        });
    }
}
