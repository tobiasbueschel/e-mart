/************************************************************************
 * Emart uses AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written stat for all view in theme.
 ************************************************************************/
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
            abstract: true,
            templateUrl: "views/register/register.html",
            data: { pageTitle: 'Register', specialClass: 'gray-bg' }
        })
        .state('register1', {
            parent: 'register',
            url: '/register',
            templateUrl: 'views/register/register1.html'
        })
        .state('register2', {
            parent: 'register',
            url: '/register2',
            templateUrl: 'views/register/register2.html'
        })
        .state('register3', {
            parent: 'register',
            url: '/register3',
            templateUrl: 'views/register/register3.html'
        })
        .state('forgot_password', {
            url: "/forgot_password",
            templateUrl: "views/forgot_password.html",
            data: { pageTitle: 'Forgot password', specialClass: 'gray-bg' }
        })

        //-----------------------------------------------------
        // ADD ITEM
        //-----------------------------------------------------
        .state('additem', {
            parent: "root",
            url:"/additem",
            templateUrl: "views/seller/additem.html",
            data: {pageTitle: "Add Item"}
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
        .state('minor', {
            parent: "root",
            url: "/minor",
            templateUrl: "views/minor.html",
            data: { pageTitle: 'Example view' }
        })

        //-----------------------------------------------------
        // E-COMMERCE
        //-----------------------------------------------------
        .state('orders', {
            parent: "root",
            url: "/orders",
            templateUrl: "views/ecommerce_orders.html",
            data: { pageTitle: 'E-commerce orders' }
        })
        .state('payments', {
            parent: "root",
            url: "/payments",
            templateUrl: "views/ecommerce_payments.html",
            data: { pageTitle: 'E-commerce payments' }
        })
        .state('product', {
            parent: "root",
            url: "/product",
            templateUrl: "views/ecommerce_product.html",
            data: { pageTitle: 'E-commerce product' }
        })
        .state('product-details', {
            parent: "root",
            url: "/product-details",
            templateUrl: "views/ecommerce_product_details.html",
            data: { pageTitle: 'E-commerce product details' }
        })
        .state('product-list', {
            parent: "root",
            url: "/product-list",
            templateUrl: "views/ecommerce_product_list.html",
            data: { pageTitle: 'E-commerce product list' }
        })
        .state('product-grid', {
            parent: "root",
            url: "/product-grid",
            templateUrl: "views/ecommerce_products_grid.html",
            data: { pageTitle: 'E-commerce grid' }
        })
        .state('cart', {
            parent: "root",
            url: "/cart",
            templateUrl: "views/ecommerce_cart.html",
            data: { pageTitle: 'Cart' }
        })

        .state('invoice', {
            parent: "root",
            url: "/invoice",
            templateUrl: "views/invoice.html",
            data: { pageTitle: 'Invoice' }
        })

        //-----------------------------------------------------
        // OTHER
        //-----------------------------------------------------
        .state('faq', {
            parent: "root",
            url: "/faq",
            templateUrl: "views/faq.html",
            data: { pageTitle: 'FAQ' }
        })
        .state('contactUs', {
            parent: "root",
            url: "/contactUs",
            templateUrl: "views/contactUs.html",
            data: { pageTitle: 'Contact us' }
        })


}
angular
    .module('emart')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });
