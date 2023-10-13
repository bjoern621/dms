using Microsoft.Extensions.Options;
using server;
using server.Models;
using server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

ConfigureServices(builder);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

var importer = new DocumentImporter(
    new MongoDatabaseService(
        Options.Create(
            new MongoDBSettings 
            { 
                ConnectionString= "mongodb://localhost:27017", 
                DatabaseName="DMS",
                DocumentsCollectionName="Documents" 
            })));
importer.ImportDocuments();

app.Run();

void ConfigureServices(WebApplicationBuilder builder)
{
    builder.Services
        .Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDBSettings"))
        .AddSingleton<IMongoDatabaseService, MongoDatabaseService>();
}