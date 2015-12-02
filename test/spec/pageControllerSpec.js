'use strict';

describe('PageController', function () {

    beforeEach(module('workanizerApp'));

    var pageController;
    var $scope;
    var $rootScope;
    var worklistRepository;
    var $q;

    beforeEach(inject(function ($controller, _$rootScope_, WorklistRepository, _$q_) {
        $rootScope = _$rootScope_;
        $scope = {};
        worklistRepository = WorklistRepository;
        $q = _$q_;

        spyOn(worklistRepository, 'findAll').and.callFake(function () {
            var deferred = $q.defer();
            var workLists = [];
            workLists.push(worklistRepository.createWorklist("My First WorkList"));
            workLists.push(worklistRepository.createWorklist("My Second WorkList"));
            deferred.resolve(workLists);
            return deferred.promise;
        });

        pageController = $controller('PageController', {
            $scope: $scope
        });

    }));

    it('exists', function(){
        expect(pageController).toBeDefined();
    });

    it('exposes all worklists in database to $scope', function () {
        $rootScope.$digest();
        expect($scope.worklists.length).toBe(2);
    });

    it('exposes function createWorklist() to $scope', function () {
        $rootScope.$digest();
        expect(typeof $scope.createWorklist).toBe("function");
    });

    it('exposes function activateWorklist() to $scope', function () {
        $rootScope.$digest();
        expect(typeof $scope.activateWorklist).toBe("function");
    });

    it('exposes function resetDatabase() to $scope', function () {
        $rootScope.$digest();
        expect(typeof $scope.resetDatabase).toBe("function");
    });
});
