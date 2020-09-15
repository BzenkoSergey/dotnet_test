using System;
using System.IO;
using System.Collections.Generic;
using System.Text.Json;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Http;

public class ImagesStore : IImagesStore {
	public String SaveToFileSystem(IFormFile file) {
		String folderName = Path.Combine("Resources", "Images");
		String pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
		String imageId = Guid.NewGuid().ToString();
		String fileExtension = Path.GetExtension(ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName);
		String fullPath = Path.Combine(pathToSave, imageId);

		using (FileStream stream = new FileStream(fullPath + ".jpg", FileMode.Create)) {
			file.CopyTo(stream);
		}
		return imageId;
	}

	public List<ImageModel> GetImagesFromDb() {
		String dataSourcePath = GetDataSourcePath();
		List<ImageModel> images = new List<ImageModel>();
		using (StreamReader reader = new StreamReader(dataSourcePath))
		{
			String json = reader.ReadToEnd();
			List<ImageModel> deserialized = JsonSerializer.Deserialize<List<ImageModel>>(json);
			images.AddRange(deserialized);
		}
		return images;
	}

	public void AddImageToDb(String imageId, Int16 colorRed, Int16 colorGreen, Int16 colorBlue) {
		ImageModel image = new ImageModel();
		image.id = imageId;
		image.colorRed = colorRed;
		image.colorBlue = colorBlue;
		image.colorGreen = colorGreen;
		List<ImageModel> images = GetImagesFromDb();
		images.Add(image);
		String json = JsonSerializer.Serialize(images);
		String dataSourcePath = GetDataSourcePath();
		using (StreamWriter outputFile = new StreamWriter(dataSourcePath)) {
			outputFile.WriteLine(json);
		}
	}

	private String GetDataSourcePath() {
		String folderName = Path.Combine("DataSource", "images.json");
		return Path.Combine(Directory.GetCurrentDirectory(), folderName);
	}
}