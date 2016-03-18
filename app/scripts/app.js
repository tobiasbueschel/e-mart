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

emart.run(function($rootScope, dataService) {
    //Get categories and conditions data from dataService
    var myDataPromise = dataService.getData();
    myDataPromise.then(function(result) {
        //inside promise then
        $scope.data.categories = result.categories;
        $scope.data.conditions = result.conditions;
    });

});