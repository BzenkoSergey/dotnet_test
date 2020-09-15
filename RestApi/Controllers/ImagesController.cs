using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace RestApi.Controllers {
    [ApiController]
    [Route("images")]
    public class ImagesController : ControllerBase {
        private readonly IImagesStore _imagesStore;
        private readonly IImagesComparator _imagesComparator;

        public ImagesController(
			IImagesStore imagesStore,
			IImagesComparator imagesComparator
		) {
			_imagesStore = imagesStore;
			_imagesComparator = imagesComparator;
        }

        [HttpGet]
        public IEnumerable<List<String>> GetSimilar(String imageId) {
			List<ImageModel> images = this._imagesStore.GetImagesFromDb();
			ImageModel mainImage = images.Find((image) => image.id == imageId);
			List<ImageModel> imagesToCompare = images.FindAll((image) => image.id != mainImage.id);
			
			return this._imagesComparator
				.getSimilarImages(imagesToCompare, mainImage)
				.Select((image) => {
					return new List<String>(){
						image.id,
						image.colorRed.ToString() + ',' + image.colorGreen.ToString() + ',' + image.colorBlue.ToString()
					};
				});
		}

		[HttpPost, DisableRequestSizeLimit]
		public IActionResult Upload() {
			try {
				IFormFile file = Request.Form.Files[0];
				if (file.Length > 0) {
					String imageId = this._imagesStore.SaveToFileSystem(file);
					Int16 red = Int16.Parse(Request.Form["red"]);
					Int16 blue = Int16.Parse(Request.Form["blue"]);
					Int16 green = Int16.Parse(Request.Form["green"]);
					this._imagesStore.AddImageToDb(imageId, red, green, blue);
					return Ok(imageId);
				} else {
					return BadRequest();
				}
			} catch (Exception ex) {
				return StatusCode(500, $"Internal server error: {ex}");
			}
		}
    }
}
