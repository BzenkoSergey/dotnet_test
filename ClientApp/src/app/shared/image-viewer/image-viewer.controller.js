import { COLOR_INSPECTOR_SERVICE_NAME } from './../color-inspector/color-inspector.service';
import { IMAGE_VIEWER_SERVICE_NAME } from './image-viewer.service';

export const imageViewerControllerDeps = [
	'$scope',
	IMAGE_VIEWER_SERVICE_NAME,
	COLOR_INSPECTOR_SERVICE_NAME
];

export class ImageViewerController {
	constructor(scope, imageViewerService, colorInspector) {
		this.image = null;
		this.color = null;
		this.scope = scope;
		this.imageViewerService = imageViewerService;
		this.colorInspector = colorInspector;
	}

	reset() {
		this.image = null;
		this.color = null;
		this.onChange({
			image: null,
			file: null
		});
	}

	async upload(files) {
		const file = files[0];
		const { base64, image } = await this.imageViewerService.getImageData(file);
		const color = this.colorInspector.getImageAverageColor(image);

		this.scope.$apply(() => {
			this.image = base64;
			this.color = `${color.r},${color.g},${color.b}`;
		});
		this.onChange({ image, file });
	}
}
