(function () {
    angular.module('carwash.myDirectives').directive('stringToNumber', function() {
		return {
			restrict : 'A',
			require: 'ngModel',
			link: function(scope, element, attrs, ngModel) {
				ngModel.$parsers.push(function(value) {
					return '' + value;
				});
				ngModel.$formatters.push(function(value) {
					return parseFloat(value, 10);
				});
			}
		}
	});
})();