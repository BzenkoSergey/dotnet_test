using System;
using System.IO;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

public interface IImagesStore {
    List<ImageModel> GetImagesFromDb();
	void AddImageToDb(String imageId, Int16 colorRed, Int16 colorGreen, Int16 colorBlue);
	String SaveToFileSystem(IFormFile file);
}
