import { restUrl } from './../../config';

export const restImagesUploadServiceDeps = ['$http'];
export const REST_IMAGES_UPLOAD_SERVICE_NAME = 'restImagesUploadService';

export class RestImagesUploadService {
	constructor($http) {
		this.$http = $http;
	}

	async upload(file, color) {
		var fd = new FormData();
		fd.append('file', file, file.name);
		fd.append('red', color.r);
		fd.append('green', color.g);
		fd.append('blue', color.b);

		return this.$http
			.post(`${restUrl}/images`, fd, {
				transformRequest: angular.identity,
				headers: {
					'Content-Type': undefined
				}
			})
			.then(({ data }) => data);
	}
}
