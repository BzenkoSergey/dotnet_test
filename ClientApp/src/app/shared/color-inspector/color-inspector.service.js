export const COLOR_INSPECTOR_SERVICE_NAME = 'colorInspectorService';

export class ColorInspectorService {
	getImageAverageColor(image) {
		const { naturalWidth: width, naturalHeight: height } = image;
		const blockSize = 4;

		const canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;
		const context = canvas.getContext('2d');

		context.drawImage(image, 0, 0);
		const imageData = context.getImageData(0, 0, width, height);
		const imageSourceData = imageData.data;
		const length = imageSourceData.length;

		let rgbRedSum = 0;
		let rgbGreenSum = 0;
		let rgbBlueSum = 0;

		for (let i = 0; i < length; i += blockSize) {
			rgbRedSum += imageSourceData[i];
			rgbGreenSum += imageSourceData[i + 1];
			rgbBlueSum += imageSourceData[i + 2];
		}

		const count = length / blockSize;
		return {
			r: Math.round(rgbRedSum / count),
			g: Math.round(rgbGreenSum / count),
			b: Math.round(rgbBlueSum / count)
		};
	}
}
