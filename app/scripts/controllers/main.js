'use strict';

/**
 * @ngdoc function
 * @name workanizerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the workanizerApp
 */
angular.module('workanizerApp')
  .controller('MainCtrl', ['WorklistRepository', function (workListRepository) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
        console.log("MainCtrl");
    workListRepository.findAll();
  }]);
