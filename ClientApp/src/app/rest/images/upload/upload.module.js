import { RestImagesUploadService, restImagesUploadServiceDeps, REST_IMAGES_UPLOAD_SERVICE_NAME } from './upload.service';

export const REST_IMAGES_UPLOAD_MODULE_NAME = 'restImagesUploadModule';

angular.module(REST_IMAGES_UPLOAD_MODULE_NAME, [])
	.factory(REST_IMAGES_UPLOAD_SERVICE_NAME, [
		...restImagesUploadServiceDeps,
		(...props) => new RestImagesUploadService(...props)
	]);
