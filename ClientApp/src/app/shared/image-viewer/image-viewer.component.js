import { ImageViewerController, imageViewerControllerDeps } from './image-viewer.controller';

export const IMAGE_VIEWER_NAME = 'imageViewer';
export const imageViewerComponent = {
	template: require('./image-viewer.html'),
	controller: [
		...imageViewerControllerDeps,
		ImageViewerController
	],
	controllerAs: 'vm',
	bindings: {
		onChange: '&'
	}
};
