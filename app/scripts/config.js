/**
 * Emart uses AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written stat for all view in theme.
 */
function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/main");

    $stateProvider


        //-----------------------------------------------------
        // ROOT
        //-----------------------------------------------------
        .state ('root', {
            abstract: true,
            templateUrl: 'views/common/content.html'
        })

        //-----------------------------------------------------
        // LOGIN | REGISTER | FORGOT PASSWORD
        //-----------------------------------------------------
        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            data: { pageTitle: 'Login', specialClass: 'gray-bg' }
        })
        .state('register', {
            url: "/register",
            templateUrl: "views/register.html",
            data: { pageTitle: 'Register', specialClass: 'gray-bg' }
        })
        .state('forgot_password', {
            url: "/forgot_password",
            templateUrl: "views/forgot_password.html",
            data: { pageTitle: 'Forgot password', specialClass: 'gray-bg' }
        })

        //-----------------------------------------------------
        // MAIN
        //-----------------------------------------------------
        .state('main', {
            parent: "root",
            url: "/main",
            templateUrl: "views/main.html",
            data: { pageTitle: 'Main' }
        })
        .state('index.minor', {
            url: "/minor",
            templateUrl: "views/minor.html",
            data: { pageTitle: 'Example view' }
        })

        //-----------------------------------------------------
        // SELLING
        //-----------------------------------------------------
        .state('products', {
            parent: "root",
            url: "/products",
            templateUrl: "views/ecommerce_products_grid.html",
            data: { pageTitle: 'E-commerce grid' }
        })

}
angular
    .module('emart')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });