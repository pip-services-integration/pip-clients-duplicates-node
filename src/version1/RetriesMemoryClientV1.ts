let _ = require('lodash');
let async = require('async');

import { FilterParams } from "pip-services3-commons-node";
import { PagingParams } from "pip-services3-commons-node";
import { IdGenerator } from "pip-services3-commons-node";
import { DataPage } from "pip-services3-commons-node";

import { IRetriesClientV1 } from "./IRetriesClientV1";
import { RetryV1 } from "./RetryV1";

export class RetriesMemoryClientV1 implements IRetriesClientV1 {
    private _maxPageSize: number = 100;
    private _items: RetryV1[];
    private readonly _defaultTTL: number = 7 * 24 * 60 * 60 * 1000;

    public constructor(...items: RetryV1[]) {
        this._items = items;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let id = filter.getAsNullableString('id');
        let group = filter.getAsNullableString('group');
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
            if (group && item.group != group)
                return false;
            if (attempt_count && item.customer_id != attempt_count)
                return false;
            if (last_attempt_time != null && item.saved != last_attempt_time)
                return false;
            return true;
        };
    }

    private createRetries(group: string, ids: string[], timeToLive: number): RetryV1[] {
        let now = new Date();
        let expirationTime = new Date(Date.now() + timeToLive);
        let result: RetryV1[] = [];

        for (let _id of ids) {
            let retry: RetryV1 = {
                id: _id,
                group: group,
                last_attempt_time: now,
                expiration_time: expirationTime,
                attempt_count: 1
            }
            result.push(retry);
        }
        return result;
    }

    public addRetry(correlationId: string, group: string, id: string, timeToLive: number, callback: (err: any, retry: RetryV1) => void) {
        this.addRetries(correlationId, group, [id], timeToLive, (err, retries) => {
            callback(err, retries && retries.length > 0 ? retries[0] : null);
        });
    }

    public addRetries(correlationId: string, group: string, ids: string[], timeToLive: number, callback: (err: any, retry: RetryV1[]) => void) {
        let result: RetryV1[] = [];
        if (group == null || ids == null || ids.length == 0) {
            return result;
        }

        let retries: RetryV1[];

        async.series([
            (callback) => {
                retries = this.createRetries(group, ids, timeToLive);
                callback();
            },
            (callback) => {
                let index = retries.length - 1;
                async.whilst(() => { return index >= 0 },
                    (cb) => {
                        let retry = retries[index--];
                        this.getRetryById(correlationId, retry.group, retry.id, (err, item) => {

                            if (item != null) {
                                retry.attempt_count = ++item.attempt_count;
                                retry.last_attempt_time = new Date();
                                this.updateRetry(correlationId, retry, (err, updatedItem) => {
                                    if (!err)
                                        result.push(updatedItem);
                                    cb(err);
                                });
                            } else {
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

    public getRetryById(correlationId: string, group: string, id: string, callback: (err: any, retry: RetryV1) => void): void {
        let retries = this._items.filter((x) => { return x.id == id && x.group == group; });
        let retry = retries.length > 0 ? retries[0] : null;
        callback(null, retry);
    }

    public getRetryByIds(correlationId: string, group: string, ids: string[], callback: (err: any, retry: RetryV1[]) => void): void {
        let filterRetries = (item: RetryV1) => {
            return _.indexOf(ids, item.id) >= 0 && item.group == group;
        }
        let retrys = _.filter(this._items, filterRetries);
        callback(null, retrys);
    }

    public deleteRetry(correlationId: string, group: string, id: string, callback: (err: any) => void): void {
        for (let index = this._items.length - 1; index >= 0; index--) {
            let retry = this._items[index];
            if (retry.group == group
                && retry.id == id) {
                this._items.splice(index, 1);
                break;
            }
        }
        callback(null);
    }

    public getGroupNames(correlationId: string, callback: (err: any, items: string[]) => void) {
        let result: string[] = [];
        for (let retry of this._items) {
            let group = retry.group;
            if (result.indexOf(group) < 0)
                result.push(group);
        }
        callback(null, result);
    }

    public getRetries(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<RetryV1>) => void) {
        let filterRetries = this.composeFilter(filter);
        let retrys = _.filter(this._items, filterRetries);

        // Extract a page
        paging = paging != null ? paging : new PagingParams();
        let skip = paging.getSkip(-1);
        let take = paging.getTake(this._maxPageSize);

        let total = null;
        if (paging.total)
            total = retrys.length;

        if (skip > 0)
            retrys = _.slice(retrys, skip);
        retrys = _.take(retrys, take);

        let page = new DataPage<RetryV1>(retrys, total);
        callback(null, page);
    }


    private createRetry(correlationId: string, retry: RetryV1,
        callback: (err: any, retry: RetryV1) => void): void {
        if (retry == null) {
            if (callback) callback(null, null);
            return;
        }

        retry = _.clone(retry);
        retry.id = retry.id || IdGenerator.nextLong();

        this._items.push(retry);

        if (callback) callback(null, retry)
    }

    private updateRetry(correlationId: string, retry: RetryV1,
        callback: (err: any, retry: RetryV1) => void): void {
        let index = this._items.map((x) => { return x.id; }).indexOf(retry.id);

        if (index < 0) {
            callback(null, null);
            return;
        }

        retry = _.clone(retry);
        this._items[index] = retry;
        if (callback) callback(null, retry)
    }
}