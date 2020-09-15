import angular from 'angular';

import '../style/app.css';

import { REST_IMAGES_UPLOAD_MODULE_NAME } from './rest/images/upload/upload.module';
import { REST_IMAGES_SIMILAR_MODULE_NAME } from './rest/images/similar/similar.module';
import { IMAGE_VIEWER_MODULE_NAME } from './shared/image-viewer/image-viewer.module';
import { COLOR_INSPECTOR_MODULE_NAME } from './shared/color-inspector/color-inspector.module';
import { appDirective, APP_DIRECTIVE_NAME } from './app.directive';

const MODULE_NAME = 'app';

angular
	.module(MODULE_NAME, [
		IMAGE_VIEWER_MODULE_NAME,
		REST_IMAGES_UPLOAD_MODULE_NAME,
		REST_IMAGES_SIMILAR_MODULE_NAME,
		COLOR_INSPECTOR_MODULE_NAME
	])
	.directive(APP_DIRECTIVE_NAME, appDirective);

export default MODULE_NAME;
