"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
class RetriesMemoryClientV1 {
    constructor(...items) {
        this._maxPageSize = 100;
        this._defaultTTL = 7 * 24 * 60 * 60 * 1000;
        this._items = items;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
        let id = filter.getAsNullableString('id');
        let collection = filter.getAsNullableString('collection');
        let attempt_count = filter.getAsNullableString('attempt_count');
        let last_attempt_time = filter.getAsNullableBoolean('last_attempt_time');
        let ids = filter.getAsObject('ids');
        // Process ids filter
        if (_.isString(ids))
            ids = ids.split(',');
        if (!_.isArray(ids))
            ids = null;
        return (item) => {
            if (id && item.id != id)
                return false;
            if (ids && _.indexOf(ids, item.id) < 0)
                return false;
            if (collection && item.collection != collection)
                return false;
            if (attempt_count && item.customer_id != attempt_count)
                return false;
            if (last_attempt_time != null && item.saved != last_attempt_time)
                return false;
            return true;
        };
    }
    createRetries(collection, ids, timeToLive) {
        let now = new Date();
        let expirationTime = new Date(Date.now() + timeToLive);
        let result = [];
        for (let _id of ids) {
            let retry = {
                id: _id,
                collection: collection,
                last_attempt_time: now,
                expiration_time: expirationTime,
                attempt_count: 1
            };
            result.push(retry);
        }
        return result;
    }
    addRetry(correlationId, collection, id, timeToLive, callback) {
        this.addRetries(correlationId, collection, [id], timeToLive, (err, retries) => {
            callback(err, retries && retries.length > 0 ? retries[0] : null);
        });
    }
    addRetries(correlationId, collection, ids, timeToLive, callback) {
        let result = [];
        if (collection == null || ids == null || ids.length == 0) {
            return result;
        }
        let retries;
        async.series([
            (callback) => {
                retries = this.createRetries(collection, ids, timeToLive);
                callback();
            },
            (callback) => {
                let index = retries.length - 1;
                async.whilst(() => { return index >= 0; }, (cb) => {
                    let retry = retries[index--];
                    this.getRetryById(correlationId, retry.collection, retry.id, (err, item) => {
                        if (item != null) {
                            retry.attempt_count = ++item.attempt_count;
                            retry.last_attempt_time = new Date();
                            this.updateRetry(correlationId, retry, (err, updatedItem) => {
                                if (!err)
                                    result.push(updatedItem);
                                cb(err);
                            });
                        }
                        else {
                            this.createRetry(correlationId, retry, (err, item) => {
                                if (!err)
                                    result.push(item);
                                cb(err);
                            });
                        }
                    });
                }, (err) => {
                    callback(err);
                });
            }
        ], (err) => {
            callback(err, result);
        });
    }
    getRetryById(correlationId, collection, id, callback) {
        let retries = this._items.filter((x) => { return x.id == id && x.collection == collection; });
        let retry = retries.length > 0 ? retries[0] : null;
        callback(null, retry);
    }
    getRetryByIds(correlationId, collection, ids, callback) {
        let filterRetries = (item) => {
            return _.indexOf(ids, item.id) >= 0 && item.collection == collection;
        };
        let retrys = _.filter(this._items, filterRetries);
        callback(null, retrys);
    }
    deleteRetry(correlationId, collection, id, callback) {
        for (let index = this._items.length - 1; index >= 0; index--) {
            let retry = this._items[index];
            if (retry.collection == collection
                && retry.id == id) {
                this._items.splice(index, 1);
                break;
            }
        }
        callback(null);
    }
    getCollectionNames(correlationId, callback) {
        let result = [];
        for (let retry of this._items) {
            let collection = retry.collection;
            if (result.indexOf(collection) < 0)
                result.push(collection);
        }
        callback(null, result);
    }
    getRetries(correlationId, filter, paging, callback) {
        let filterRetries = this.composeFilter(filter);
        let retrys = _.filter(this._items, filterRetries);
        // Extract a page
        paging = paging != null ? paging : new pip_services3_commons_node_1.PagingParams();
        let skip = paging.getSkip(-1);
        let take = paging.getTake(this._maxPageSize);
        let total = null;
        if (paging.total)
            total = retrys.length;
        if (skip > 0)
            retrys = _.slice(retrys, skip);
        retrys = _.take(retrys, take);
        let page = new pip_services3_commons_node_1.DataPage(retrys, total);
        callback(null, page);
    }
    createRetry(correlationId, retry, callback) {
        if (retry == null) {
            if (callback)
                callback(null, null);
            return;
        }
        retry = _.clone(retry);
        retry.id = retry.id || pip_services3_commons_node_1.IdGenerator.nextLong();
        this._items.push(retry);
        if (callback)
            callback(null, retry);
    }
    updateRetry(correlationId, retry, callback) {
        let index = this._items.map((x) => { return x.id; }).indexOf(retry.id);
        if (index < 0) {
            callback(null, null);
            return;
        }
        retry = _.clone(retry);
        this._items[index] = retry;
        if (callback)
            callback(null, retry);
    }
}
exports.RetriesMemoryClientV1 = RetriesMemoryClientV1;
//# sourceMappingURL=RetriesMemoryClientV1.js.map