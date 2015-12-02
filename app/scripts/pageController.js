'use strict';

angular.module('workanizerApp')
    .controller('PageController', ['$scope', 'WorklistRepository', 'WorkitemRepository', '$q', '$indexedDB', function ($scope, worklistRepository, workitemRepository, $q, $indexedDB) {

        exposeWorklists();

        function exposeWorklists() {
            $scope.worklists = [];
            worklistRepository.findAll().then(function (worklists) {
                $scope.worklists = worklists;
                if ($scope.worklists.length > 0) {
                    $scope.activeWorklist = $scope.worklists[0];
                    exposeWorkitems();
                }
            });
        }

        function exposeWorkitems() {
            $scope.workitems = [];
            workitemRepository.findByWorklist($scope.activeWorklist.id).then(function (workitems) {
                $scope.workitems = workitems;
            });
        }

        /**
         * Selects the given worklist to be active (i.e. the items on this worklist are going to be displayed).
         * @param worklist the worklist to activate.
         */
        $scope.activateWorklist = function (worklist) {
            $scope.activeWorklist = worklist;
            exposeWorkitems();
        };

        /**
         * Creates a new worklist and stores it in the database.
         * @param name the name of the new worklist.
         */
        $scope.createWorklist = function (name) {
            // TODO: user feedback in case worklist already exists
            var worklist = worklistRepository.createWorklist(name);
            worklistRepository.save(worklist).then(function () {
                $scope.worklists.push(worklist);
                $scope.newWorklistName = "";
            });
        };

        $scope.createWorkitem = function (text) {
            var workitem = workitemRepository.createWorkitem(text, $scope.activeWorklist.id);
            workitemRepository.save(workitem).then(function () {
                $scope.workitems.push(workitem);
                $scope.newWorkitemText = "";
            });
        };

        $scope.updateItem = function(workitem){
            workitemRepository.save(workitem);
        };

        /**
         * Clears the IndexedDB and puts some initial data in.
         */
        $scope.resetDatabase = function () {
            // TODO: confirmation dialog!!!

            $indexedDB.deleteDatabase().then(function () {
                var savePromises = [];
                savePromises.push(worklistRepository.save(worklistRepository.createWorklist("Today")));
                savePromises.push(worklistRepository.save(worklistRepository.createWorklist("Trash")));
                savePromises.push(workitemRepository.save(workitemRepository.createWorkitem("Write Mail to Sally", 1)));
                savePromises.push(workitemRepository.save(workitemRepository.createWorkitem("Get Groceries", 2)));
                $q.all(savePromises).then(function (results) {
                    exposeWorklists();
                    // TODO: user feedback
                });
            });

        };

    }]);