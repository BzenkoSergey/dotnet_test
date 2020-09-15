import { FILE_CHANGE_MODULE_NAME } from './../file-change/file-change.module';
import { COLOR_INSPECTOR_MODULE_NAME } from './../color-inspector/color-inspector.module';
import { imageViewerComponent, IMAGE_VIEWER_NAME } from './image-viewer.component';
import { ImageViewerService, IMAGE_VIEWER_SERVICE_NAME } from './image-viewer.service';
export const IMAGE_VIEWER_MODULE_NAME = 'imageViewerModule';

angular.module(IMAGE_VIEWER_MODULE_NAME, [FILE_CHANGE_MODULE_NAME, COLOR_INSPECTOR_MODULE_NAME])
	.factory(IMAGE_VIEWER_SERVICE_NAME, (...props) => new ImageViewerService(...props))
	.component(IMAGE_VIEWER_NAME, imageViewerComponent);
