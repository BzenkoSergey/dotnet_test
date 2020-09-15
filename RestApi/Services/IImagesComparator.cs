using System;
using System.Collections.Generic;

public interface IImagesComparator {
	List<ImageModel> getSimilarImages(List<ImageModel> images, ImageModel mainImage);
}
