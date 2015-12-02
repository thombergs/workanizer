'use strict';

/**
 * Workanizer namespace.
 */
var Workanizer = Workanizer || {};

Workanizer.WorkitemRepository = function (_$indexedDB_, _$q_) {
    this.$indexedDB = _$indexedDB_;
    this.$q = _$q_;
};

Workanizer.WorkitemRepository.prototype.save = function (item) {
    if (!this.isWorkitem(item)) {
        throw 'Object is not a Workitem: ' + item;
    }
    return this.$indexedDB.openStore('workitem', function (store) {
        store.upsert(item);
    });
};

Workanizer.WorkitemRepository.prototype.findByWorklist = function (worklistId) {
    var deferred = this.$q.defer();
    this.$indexedDB.openStore('workitem', function (store) {
        var query = store.query();
        query = query.$eq(worklistId);
        query = query.$index("worklist_idx");
        store.findWhere(query).then(function (workitems) {
            deferred.resolve(workitems);
        });
    });
    return deferred.promise;
};

Workanizer.WorkitemRepository.prototype.createWorkitem = function (text, worklistId) {
    return {
        "text": text,
        "done": false,
        "createdAt": new Date(),
        "worklistId": worklistId
    };
};

Workanizer.WorkitemRepository.prototype.isWorkitem = function (object) {
    return angular.isObject(object) &&
        typeof object.text === 'string';
};

Workanizer.WorkitemRepository.prototype.deleteAll = function () {
    return this.$indexedDB.openStore('workitem', function (store) {
        store.clear();
    });
};

angular.module('workanizerApp')
    .service('WorkitemRepository', ['$indexedDB', '$q', Workanizer.WorkitemRepository]);