'use strict';

/**
 * Workanizer namespace.
 */
var Workanizer = Workanizer || {};

Workanizer.WorklistRepository = function (_$indexedDB_, _$q_) {
    this.$indexedDB = _$indexedDB_;
    this.$q = _$q_;
};

Workanizer.WorklistRepository.prototype.findAll = function () {
    var deferred = this.$q.defer();
    this.$indexedDB.openStore('worklist', function (store) {
        store.getAll().then(function (worklists) {
            deferred.resolve(worklists);
        });
    });
    return deferred.promise;
};

Workanizer.WorklistRepository.prototype.findOne = function (name) {
    var deferred = this.$q.defer();
    this.$indexedDB.openStore('worklist', function (store) {
        store.find(name).then(function (worklist) {
            deferred.resolve(worklist);
        });
    });
    return deferred.promise;
};

Workanizer.WorklistRepository.prototype.save = function (workList) {
    if (!this.isWorklist(workList)) {
        throw 'Object is not a workList: ' + workList;
    }
    return this.$indexedDB.openStore('worklist', function (store) {
        store.insert(workList);
    });
};

Workanizer.WorklistRepository.prototype.createWorklist = function (name) {
    return {"name": name};
};

Workanizer.WorklistRepository.prototype.isWorklist = function (object) {
    return angular.isObject(object) &&
        typeof object.name === 'string';
};

Workanizer.WorklistRepository.prototype.deleteAll = function () {
    return this.$indexedDB.openStore('worklist', function (store) {
        store.clear();
    });
};

angular.module('workanizerApp')
    .service('WorklistRepository', ['$indexedDB', '$q', Workanizer.WorklistRepository]);