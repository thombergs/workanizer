'use strict';

describe('WorkitemRepository', function () {

    beforeEach(module('workanizerApp'));

    var workitemRepository;
    var $rootScope;
    var $q;

    beforeEach(inject(function (WorkitemRepository, _$rootScope_, _$q_) {
        $rootScope = _$rootScope_;
        workitemRepository = WorkitemRepository;
        $q = _$q_;
        var deletePromise = workitemRepository.deleteAll();
        deletePromise.then(function () {
            // repository has been emptied
        });
    }));

    it('exists', function () {
        expect(workitemRepository).toBeDefined();
    });

    describe('isWorkitem()', function () {
        it('recognizes valid Workitem objects', function () {
            var validWorkitem = {"text": "My Task"};
            expect(workitemRepository.isWorkitem(validWorkitem)).toBe(true);
        });

        it('recognizes invalid Workitem objects', function () {
            var invalidWorkitem1 = "";
            expect(workitemRepository.isWorkitem(invalidWorkitem1)).toBe(false);

            var invalidWorkitem2 = {"foo": "bar"};
            expect(workitemRepository.isWorkitem(invalidWorkitem2)).toBe(false);
        });
    });

    describe('save() and findByWorklist()', function () {
        it('should save and retrieve a valid Workitem object', function (done) {
            var workitem = workitemRepository.createWorkitem("My Workitem", 1);
            var promise = workitemRepository.save(workitem);
            console.log(promise);
            promise.then(function (result) {
//                worklistRepository.findByWorklist(1).then(function (results) {
//                    expect(results.length).toBe(1);
//                    expect(results[0].text).toBe("MyWorkitem");
//                    done();
//                });
                done();
            });
            // trigger resolving of promises
            $rootScope.$digest();
        });
    });

});