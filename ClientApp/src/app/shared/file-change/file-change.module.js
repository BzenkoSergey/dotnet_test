import { fileChangeDirective, FILE_CHANGE_DIRECTIVE_NAME } from './file-change.directive';

export const FILE_CHANGE_MODULE_NAME = 'fileChangeModule';

const fileChangeModule = angular.module(FILE_CHANGE_MODULE_NAME, []);
fileChangeModule.directive(FILE_CHANGE_DIRECTIVE_NAME, ['$parse', fileChangeDirective]);
