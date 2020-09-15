import { restUrl } from './rest/config';
import { REST_IMAGES_UPLOAD_SERVICE_NAME } from './rest/images/upload/upload.service';
import { REST_IMAGES_SIMILAR_SERVICE_NAME } from './rest/images/similar/similar.service';
import { COLOR_INSPECTOR_SERVICE_NAME } from './shared/color-inspector/color-inspector.service';

export const appControllerDeps = [
	'$scope',
	REST_IMAGES_UPLOAD_SERVICE_NAME,
	REST_IMAGES_SIMILAR_SERVICE_NAME,
	COLOR_INSPECTOR_SERVICE_NAME
];

export class AppController {
	constructor(scope, restImagesUpload, restImageSimilar, colorInspector) {
		this.scope = scope;
		this.restImagesUpload = restImagesUpload;
		this.restImageSimilar = restImageSimilar;
		this.colorInspector = colorInspector;
		this.similarImages = [];
		this.imageHost = restUrl;
	}

	onImageChange(image, file) {
		if (!image || !file) {
			this.similarImages = [];
			return;
		}
		const color = this.colorInspector.getImageAverageColor(image);
		this.upload(file, color);
	}

	async upload(file, color) {
		const imageId = await this.restImagesUpload.upload(file, color);
		const similar = await this.restImageSimilar.get(imageId);
		this.scope.$apply(() => {
			this.similarImages = similar.map(([id, rgb]) => ({
				id, rgb
			}));
		});
	}
}
