import { restUrl } from './../../config';

export const restImagesSimilarServiceDeps = ['$http'];
export const REST_IMAGES_SIMILAR_SERVICE_NAME = 'restImagesSimilarService';

export class RestImagesSimilarService {
	constructor($http) {
		this.$http = $http;
	}

	async get(imageId) {
		return this.$http
			.get(`${restUrl}/images`, {
				params: {
					imageId
				}
			})
			.then(({ data }) => data);
	}
}
