import { RestImagesSimilarService, restImagesSimilarServiceDeps, REST_IMAGES_SIMILAR_SERVICE_NAME } from './similar.service';

export const REST_IMAGES_SIMILAR_MODULE_NAME = 'restImagesSimilarModule';

angular.module(REST_IMAGES_SIMILAR_MODULE_NAME, [])
	.factory(REST_IMAGES_SIMILAR_SERVICE_NAME, [
		...restImagesSimilarServiceDeps,
		(...props) => new RestImagesSimilarService(...props)
	]);
