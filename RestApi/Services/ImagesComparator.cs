using System;
using System.Collections.Generic;

public class ImagesComparator : IImagesComparator {
	public List<ImageModel> getSimilarImages(List<ImageModel> images, ImageModel mainImage) {
		ColorModel mainColor = new ColorModel(mainImage.colorRed, mainImage.colorGreen, mainImage.colorBlue);

		return images
			.FindAll((image) => {
				ColorModel color = new ColorModel(image.colorRed, image.colorGreen, image.colorBlue);
				float colorsDiff = this.colorsDiff(mainColor, color);
				return colorsDiff < 5;
			});
	}

	private float colorsDiff(ColorModel colorA, ColorModel colorB) {
		int diffRed = Math.Abs(colorA.red - colorB.red);
		int diffGreen = Math.Abs(colorA.green - colorB.green);
		int diffBlue = Math.Abs(colorA.blue - colorB.blue);
		float pctDiffRed = (float)diffRed / 255;
		float pctDiffGreen = (float)diffGreen / 255;
		float pctDiffBlue = (float)diffBlue / 255;
		return (pctDiffRed + pctDiffGreen + pctDiffBlue) / 3 * 100;
	}
}