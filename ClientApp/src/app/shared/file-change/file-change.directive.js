export const FILE_CHANGE_DIRECTIVE_NAME = 'fileChange';

export const fileChangeDirective = ($parse) => {
	return {
		restrict: 'A',
		link: (scope, element, attrs) => {
			const handler = $parse(attrs[FILE_CHANGE_DIRECTIVE_NAME]);

			element.bind('change', () => handler(scope, {
				$event: element[0].files
			}));
		}
	};
};
