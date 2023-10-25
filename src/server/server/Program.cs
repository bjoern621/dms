using server;
using server.Models;
using Server.Services;

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

app.Run();

void ConfigureServices(WebApplicationBuilder builder)
{
    builder.Services
        .Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDBSettings"))
        .AddSingleton<DocumentCollectionService>()
        .AddTransient(provider =>
        {
            return new FileManagementService(builder.Configuration.GetValue<string>("FileRootDirectoryOverride"));
        });
}