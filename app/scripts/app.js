var emart = angular.module('emart', [
    'ui.router',                    // Routing
    'ui.bootstrap',                 // Bootstrap
    'ui.footable',
    'slick',
    'summernote',
    'toaster',
    'ngCookies',
    'flow',
    'firebase',
    'timer'
]);

emart.run(function($rootScope, $state) {
    $rootScope.$state = $state;
});

//filters
emart.filter('yes_no', function() {
    return function(isActive, length, end) {
        if (isActive==1) {
            return 'Yes';
        }
        return 'No';
    }
});

