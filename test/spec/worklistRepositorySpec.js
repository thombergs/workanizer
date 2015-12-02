'use strict';

describe('WorklistRepository', function () {

    beforeEach(module('workanizerApp'));

    var worklistRepository;
    var $rootScope;
    var $q;

    beforeEach(inject(function (_WorklistRepository_, _$rootScope_, _$q_) {
        $rootScope = _$rootScope_;
        worklistRepository = _WorklistRepository_;
        $q = _$q_;
        var deletePromise = worklistRepository.deleteAll();
        deletePromise.then(function () {
            // repository has been emptied
        });
    }));

    it('should exist', function () {
        expect(worklistRepository).toBeDefined();
    });

    describe('isWorklist()', function () {
        it('recognizes valid WorkList objects', function () {
            var validWorkList = {"name": "My WorkList"};
            expect(worklistRepository.isWorklist(validWorkList)).toBe(true);
        });

        it('recognizes invalid WorkList objects', function () {
            var invalidWorkList1 = "";
            expect(worklistRepository.isWorklist(invalidWorkList1)).toBe(false);

            var invalidWorkList2 = {"foo": "bar"};
            expect(worklistRepository.isWorklist(invalidWorkList2)).toBe(false);
        });
    });

    describe('save(), findOne() and findAll()', function () {
        it('should save and retrieve a valid WorkList object', function (done) {
            var worklist = worklistRepository.createWorklist("My Worklist");
            var promise = worklistRepository.save(worklist);
            promise.then(function () {
                var findAllPromise = worklistRepository.findAll();
                var findOnePromise = worklistRepository.findOne("My Worklist");
                $q.all([findAllPromise, findOnePromise]).then(function (results) {
                    var findAllResult = results[0];
                    expect(findAllResult.length).toBe(1);
                    var findOneResult = results[1];
                    expect(findOneResult.name).toBe("My Worklist");
                    done();
                });
            });
            // trigger resolving of promises
            $rootScope.$digest();
        });
    });

});