'use strict';

/**
 * @ngdoc overview
 * @name workanizerApp
 * @description
 * # workanizerApp
 *
 * Main module of the application.
 */
angular
    .module('workanizerApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'indexedDB',
        'mwl.bluebird'
    ])
    .config(function ($routeProvider, $indexedDBProvider) {

        $indexedDBProvider
            .connection('workanizerDB')
            .upgradeDatabase(1, function (event, db, tx) {
                var objStore = db.createObjectStore('worklist', {keyPath: 'id', autoIncrement: true});
                objStore.createIndex('name_idx', 'name', {unique: true});
                objStore.createIndex('id_idx', 'id', {unique: true});
            });

        $indexedDBProvider
            .connection('workanizerDB')
            .upgradeDatabase(2, function (event, db, tx) {
                var objStore = db.createObjectStore('workitem', {keyPath: 'id', autoIncrement: true});
                objStore.createIndex('id_idx', 'id', {unique: true});
                objStore.createIndex('worklist_idx', 'worklistId', {unique: false});
            });

        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

angular.module('mwl.bluebird').run(function ($q, $log) {
    $q.onPossiblyUnhandledRejection(function (err) {
        console.warn('Unhandled promise rejection: ' + err);
    });
});

