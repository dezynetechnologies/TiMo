'use strict';

angular.module('tiMoApp', [ 
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'ngStorage',
  'ngTouch',
  'pascalprecht.translate',
  'oc.lazyLoad',
  'cfp.loadingBar',
  'ui.utils',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap'
 ])   .config(function ($stateProvider, $urlRouterProvider, $locationProvider  , $httpProvider  ) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true); 
            $httpProvider.interceptors.push('authInterceptor'); 
    })  

    .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                if ($cookieStore.get('token')) {
                    config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                }
                return config;
            },

            // Intercept 401s and redirect you to login
            responseError: function (response) {
                if (response.status === 401) {
                    $location.path('/login');
                    // remove any stale tokens
                    $cookieStore.remove('token');
                    return $q.reject(response);
                } else {
                    return $q.reject(response);
                }
            }
        };
    })

    .run(function ($rootScope, $location, Auth, $state, $stateParams, $window, $templateCache) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$storage = $window.localStorage;
        // Scope Globals
        // -----------------------------------
        $rootScope.app = {
            name: 'Angle',
            description: 'Angular Bootstrap Admin Template',
            year: ((new Date()).getFullYear()),
            layout: {
                isFixed: true,
                isCollapsed: false,
                isBoxed: false,
                isRTL: false,
                horizontal: false,
                isFloat: false,
                asideHover: false,
                theme: null
            },
            useFullLayout: false,
            hiddenFooter: false,
            viewAnimation: 'ng-fadeInUp'
        };
        $rootScope.user = {
            name: 'John',
            job: 'ng-Dev',
            picture: 'app/img/user/02.jpg'
        };
        // Redirect to login if route requires auth and you're not logged in
        /*$rootScope.$on('$stateChangeStart', function (event, next) {
          Auth.isLoggedInAsync(function(loggedIn) {
            if (next.authenticate && !loggedIn) {
              $location.path('/login');
            }
          });
        });*/
    })  ;