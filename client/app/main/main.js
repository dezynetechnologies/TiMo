'use strict';

angular.module('tiMoApp')   .config(function ($stateProvider, $urlRouterProvider, RouteHelpersProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('main.frontpage', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl'
            })
            .state('main', {
                //url: '/',
                abstract: true,
                templateUrl: 'app/main/app.html',
                resolve: RouteHelpersProvider.resolveFor('modernizr', 'icons')
            })

    }); 