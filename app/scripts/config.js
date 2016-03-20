/************************************************************************
 * Emart uses AngularUI Router to manage routing and views
 * Each view are defined as state.
 * Initial there are written stat for all view in theme.
 ************************************************************************/

emart.config(function ($stateProvider, $urlRouterProvider, flowFactoryProvider){

    //Flow factory for file uploads

    flowFactoryProvider.defaults = {
        target: 'php/upload.php',
        permanentErrors: [404, 500, 501],
        maxChunkRetries: 1,
        chunkRetryInterval: 5000,
        simultaneousUploads: 4
    };
    flowFactoryProvider.on('catchAll', function (event) {
        console.log('catchAll', arguments);
    });


    $urlRouterProvider.otherwise("/endingsoon");

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
        // PROFILE
        //-----------------------------------------------------
        .state('profile', {
            templateUrl: "views/common/content.html",
            controller: "profileCtrl",
            data: { mainState: 'profile.rating', mainStateName: 'Profile', name: 'My Account' }
        })
        .state('profile.rating', {
            url: "/profile",
            templateUrl: "views/profile/ratings.html",
            data: { pageTitle: 'My Account | Profil Rating', subStateName: 'Rating' }
        })

        //-----------------------------------------------------
        // ENDING SOON
        //-----------------------------------------------------
        .state('endingsoon', {
            parent: "root",
            url: "/endingsoon",
            controller: "auctionListCtrl",
            templateUrl: "views/buyer/ending_soon.html",
            data: { mainState: 'endingsoon', mainStateName: 'Buyer', name: 'Ending Soon', hide: true, toggleView: true }
        })

        //-----------------------------------------------------
        // SELLER DASHBOARD
        //-----------------------------------------------------
        .state('seller', {
            templateUrl: "views/common/content.html",
            controller: "sellerDashboardCtrl",
            data: { mainState: 'seller.onsale', mainStateName: 'On Sale', name: 'Seller Dashboard', toggleView: false }
        })
        .state('seller.additem', {
            url:"/additem",
            templateUrl: "views/seller/additem.html",
            controller: 'addItemCtrl',
            data: { pageTitle: 'Seller Dashboard | Add Item', subStateName: 'Add Item', toggleView: false }
        })
        .state('seller.draft', {
            url: "/seller-draft",
            templateUrl: "views/seller/seller_draft.html",
            data: { pageTitle: 'Seller Dashboard | Items Drafted', subStateName: 'Items Drafted' }
        })
        .state('seller.onsale', {
            url: "/seller-onsale",
            templateUrl: "views/seller/seller_onsale.html",
            data: { pageTitle: 'Seller Dashboard | Items On Sale', subStateName: 'Items On Sale' }
        })
        .state('seller.sold', {
            url: "/seller-sold",
            templateUrl: "views/seller/seller_sold.html",
            data: { pageTitle: 'Seller Dashboard | Items Sold', subStateName: 'Items Sold' }
        })

        .state('seller.edititem', {
            url:"/edititem?:itemid",
            controller: "editItemCtrl",
            templateUrl: function (param){
                return "views/seller/edititem.html?itemid="+param.id;
            },
            data: { pageTitle: 'Seller Dashboard | Edit Item', subStateName: 'Edit Item' }
        })
        .state('addauction', {
            parent: "root",
            url:"/addauction",
            templateUrl: "views/seller/addauction.html",
            data: {pageTitle: "Create Auction"}
        })

        //-----------------------------------------------------
        // BUYER DASHBOARD
        //-----------------------------------------------------
        .state('buyer', {
            templateUrl: "views/common/content.html",
            data: { mainState: 'buyer.bids', mainStateName: 'My Bids', name: 'Buyer Dashboard' }
        })
        .state('buyer.mybids', {
            url: "/bybids",
            templateUrl: "views/buyer/mybids.html",
            controller: "BuyerDashboardCtrl",
            data: { pageTitle: 'Buyer Dashboard | My Bids' }
        })
        .state('buyer.boughtItems', {
            url: "/bought-items",
            templateUrl: "views/buyer/boughtItems.html",
            controller: "boughtItemsCtrl",
            data: { pageTitle: 'Buyer Dashboard | Bought Items', subStateName: "Bought Items" }
        })
        .state('buyer.bookmarks', {
            url: "/bookmarks",
            templateUrl: "views/buyer/bookmarks.html",
            controller: "bookmarkCtrl",
            data: { pageTitle: 'Buyer Dashboard | Bookmarks', subStateName: "Bookmarks" }
        })


        .state('buyer.createbid', {
            parent: "root",
            url:"/createbid?:id&{other}",
            templateUrl: function (param){
                return "views/buyer/createbid.html?id="+param.id +"&other="+param.other
            },
            data: {pageTitle: "Create Bid"}
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
            templateUrl: "views/buyer/invoice.html",
            data: { pageTitle: 'Invoice' }
        })
        .state('payments', {
            parent: "root",
            url: "/payments",
            templateUrl: "views/ecommerce_payments.html",
            data: { pageTitle: 'E-commerce payments' }
        })

        //-----------------------------------------------------
        // E-COMMERCE
        //-----------------------------------------------------
        .state('ecommerce', {
            templateUrl: "views/common/content.html",
            controller: "ecommerceCtrl",
            data: { mainState: 'ecommerce.grid', mainStateName: 'Product Grid', name: 'E-Commerce', toggleView: true }
        })
        .state('ecommerce.grid', {
            url:"/ecommerce?:categoryid",
            controller: "auctionListCtrl",
            templateUrl: function (param){
                return "views/ecommerce/products_grid.html?categoryid="+param.id;
            },
            data: { pageTitle: 'E-commerce | Product Grid', subStateName: 'Product Grid' }
        })
        .state('ecommerce.list', {
            url: "/ecommerce-list?:categoryid",
            templateUrl: function (param){
                return "views/ecommerce/ecommerce_product_list.html?categoryid="+param.id;
            },
            data: { pageTitle: 'E-commerce | Product List', subStateName: 'Product List' }
        })
        .state('ecommerce.details', {
            url: "/ecommerce-details",
            params: {
                itemid: null,
                auctionid: null
            },
            controller: "productDetailsCtrl",
            templateUrl: "views/ecommerce/ecommerce_product_details.html",
            data: { pageTitle: 'E-commerce | Product Details', subStateName: 'Product Details' }
        })
        .state('viewbid', {
            parent: "root",
            url: "/viewbid?:id&{other}",
            templateUrl: function (param){
                return "views/ecommerce/bidhistory.html?id="+param.id +"&other="+param.other
            },
            data: { pageTitle: 'View Bid' }
        })

        //-----------------------------------------------------
        // HELP & OTHERS
        //-----------------------------------------------------
        .state('faq', {
            parent: "root",
            url: "/faq",
            templateUrl: "views/other/faq.html",
            data: { pageTitle: 'FAQ', name: 'Help', mainStateName: 'Frequently Asked Questions' }
        })
        .state('contact', {
            parent: "root",
            url: "/contact",
            templateUrl: "views/other/contactUs.html",
            data: { pageTitle: 'Contact us', name: 'Help', mainStateName: 'Contact us' }
        })
        .state('tos', {
            parent: "root",
            url: "/tos",
            templateUrl: "views/other/tos.html",
            data: { pageTitle: 'Terms & Conditions', name: 'Help', mainStateName: 'Terms & Conditions' }
        })
        .state('search', {
            parent: "root",
            url:"/search",
            templateUrl: "views/other/search.html",
            controller: "searchCtrl",
            data: { pageTitle: 'Search Results', name: 'Search Results', hide: true }
        })

        //-----------------------------------------------------
        // VIDEO
        //-----------------------------------------------------
        .state('video', {
            parent: "root",
            url: "/video",
            templateUrl: "views/other/video.html",
            data: { pageTitle: 'Video', name: 'Video', hide: true }
        })
});
