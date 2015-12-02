'use strict';

/**
 * @ngdoc function
 * @name workanizerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the workanizerApp
 */
angular.module('workanizerApp')
  .controller('AboutCtrl', ['WorklistRepository', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
