'use strict';

angular.module('tiMoApp')   .config(function ($stateProvider) {
        $stateProvider
            .state('main.admin', {
                url: '^/admin',
                templateUrl: 'app/admin/admin.html',
                controller: 'AdminCtrl'
            });
    }); 