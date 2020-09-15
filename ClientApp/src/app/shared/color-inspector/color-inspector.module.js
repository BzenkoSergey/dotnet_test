import { ColorInspectorService, COLOR_INSPECTOR_SERVICE_NAME } from './color-inspector.service';

export const COLOR_INSPECTOR_MODULE_NAME = 'colorInspectorModule';

angular.module(COLOR_INSPECTOR_MODULE_NAME, [])
	.factory(COLOR_INSPECTOR_SERVICE_NAME, (...props) => new ColorInspectorService(...props));
