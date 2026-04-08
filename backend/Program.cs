using backend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// -------------------------------------
// 1. READ CONNECTION STRING SAFELY
// -------------------------------------
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

Console.WriteLine($"CONNECTION STRING: [{connectionString}]");

if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new Exception("❌ Connection string is missing or empty in appsettings.json");
}

// -------------------------------------
// 2. DB CONTEXT (SAFE MYSQL CONFIG)
// -------------------------------------
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseMySql(
        connectionString,
        new MySqlServerVersion(new Version(8, 0, 36)) // ✅ NO AutoDetect (prevents crash)
    );
});

// -------------------------------------
// 3. CORS (React frontend)
// -------------------------------------
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
    });
});

// -------------------------------------
// 4. CONTROLLERS
// -------------------------------------
builder.Services.AddControllers();

// Optional OpenAPI / Swagger
builder.Services.AddOpenApi();

var app = builder.Build();

// -------------------------------------
// 5. MIDDLEWARE PIPELINE
// -------------------------------------
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("AllowReact");

app.MapControllers();

// -------------------------------------
// 6. DEBUG OUTPUT
// -------------------------------------
Console.WriteLine("AppDbContext loaded:");
Console.WriteLine(typeof(AppDbContext).FullName);

// -------------------------------------
// 7. RUN APP
// -------------------------------------
app.Run();