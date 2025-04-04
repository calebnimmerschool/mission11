using Microsoft.EntityFrameworkCore;
using mission11.API.Data; // Ensure this matches your actual namespace

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

// Enable CORS for React frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOrigin",
        policy => policy.AllowAnyOrigin() // Allow frontend access
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

// Configure SQLite database using the connection string from appsettings.json
builder.Services.AddDbContext<BookContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Enable CORS
app.UseCors("AllowAnyOrigin");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();

