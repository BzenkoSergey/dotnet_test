using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace RestApi {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services) {
            services.AddControllers();
			services.AddCors(options => {
                options.AddPolicy(
					"CorsPolicy",
                    builder => builder.AllowAnyOrigin()
						.AllowAnyMethod()
						.AllowAnyHeader()
				);
			});
			services.AddScoped<IImagesStore, ImagesStore>();
			services.AddScoped<IImagesComparator, ImagesComparator>();
			services.Configure<FormOptions>(o => {
				o.ValueLengthLimit = int.MaxValue;
				o.MultipartBodyLengthLimit = int.MaxValue;
				o.MemoryBufferThreshold = int.MaxValue;
			});
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
			app.UseCors("CorsPolicy");
			app.UseStaticFiles(
				new StaticFileOptions()
				{
					FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
					RequestPath = new PathString("/Resources")
				}
			);
            app.UseRouting();
            app.UseEndpoints(endpoints => endpoints.MapControllers());
        }
    }
}
