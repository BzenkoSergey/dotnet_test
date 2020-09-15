import { AppController, appControllerDeps } from './app.controller';

export const APP_DIRECTIVE_NAME = 'app';

export const appDirective = () => ({
	template: require('./app.html'),
	controller: [...appControllerDeps, AppController],
	controllerAs: 'vm'
});
