'use strict';

// Configuring the Core module
angular.module('tiMoApp').run(['Menus',
  function (Menus) {

            // Add default menu entry
            Menus.addMenuItem('sidebar', 'Home', 'home', null, '/home', true, null, null, 'icon-home');

  }
]).config(['$ocLazyLoadProvider', 'APP_REQUIRES', function ($ocLazyLoadProvider, APP_REQUIRES) {
        // Lazy Load modules configuration
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: APP_REQUIRES.modules
        });

}]).config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
  function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
            // registering components after bootstrap
            angular.module('tiMoApp').controller = $controllerProvider.register;
            angular.module('tiMoApp').directive = $compileProvider.directive;
            angular.module('tiMoApp').filter = $filterProvider.register;
            angular.module('tiMoApp').factory = $provide.factory;
            angular.module('tiMoApp').service = $provide.service;
            angular.module('tiMoApp').constant = $provide.constant;
            angular.module('tiMoApp').value = $provide.value;

}]).config(['$translateProvider', function ($translateProvider) {

        $translateProvider.useStaticFilesLoader({
            prefix: 'assets/i18n/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useLocalStorage();

}])
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {

        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 500;
        cfpLoadingBarProvider.parentSelector = '.wrapper > section';
}]);