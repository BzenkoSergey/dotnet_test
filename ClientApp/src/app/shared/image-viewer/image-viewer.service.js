export const IMAGE_VIEWER_SERVICE_NAME = 'imageViewerService';

export class ImageViewerService {
	async getImageData(file) {
		const base64 = await this.getImageBase64(file);
		const image = await this.createImage(base64);
		return {
			base64,
			image
		};
	}

	createImage(base64) {
		return new Promise((resolve) => {
			const img = new Image();
			img.onload = () => resolve(img);
			img.src = base64;
		});
	}

	getImageBase64(file) {
		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.onload = ({ target: { result } }) => resolve(result);
			reader.readAsDataURL(file);
		});
	}
}
