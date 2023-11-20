using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Treinamento_C_.Middleware;
using Treinamento_C_.Repository;

namespace Treinamento_C_
{
    public class Startup
    {
        
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            
        }
        private protected string DBConnection = "AdventureWorks2022";
        private protected string DBCTeste = "teste";
        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy(name:"MyCorePolicy", builder =>
                {
                    builder.WithOrigins("http://localhost:3000")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });
            services.AddControllers();
            services.AddScoped<Authentication>();



            // Pega a string da conexão
            BaseRepository.DBConnection = Configuration.GetConnectionString(DBConnection);
            BaseRepository.DBCTeste = Configuration.GetConnectionString(DBCTeste);

        }
        public void Configure(WebApplication app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
               
            }
            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors("MyCorePolicy");
            app.UseCors(builder => builder
            .AllowCredentials()
            .AllowAnyMethod()
            .AllowAnyHeader()
            );

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                app.MapControllers();
            });



        }
    }
}
