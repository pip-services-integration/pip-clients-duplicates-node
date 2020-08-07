let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { IRetriesClientV1 } from '../../src/version1/IRetriesClientV1';

export class RetriesClientV1Fixture {
    private _client: IRetriesClientV1;

    constructor(persistence) {
        assert.isNotNull(persistence);
        this._client = persistence;
    }

    testGetRetryGroups(done) {
        async.series([
            // Add retries
            (callback) => {
                this._client.addRetry(null, "Common.Group", "123", 3, callback);
            }, (callback) => {
                this._client.addRetry(null, "Common.AnotherGroup", "123", 3, callback);
            }, (callback) => {
                this._client.addRetry(null, "Common.Group", "ABC", 3, callback);
            }, (callback) => {

                this._client.getGroupNames(null, (err, items) => {
                    assert.isNull(err);
                    assert.equal(2, items.length);
                    assert.include(items, "Common.Group");
                    assert.include(items, "Common.AnotherGroup");
                    callback();
                });

            }], done);
    }

    testGetRetries(done) {
        async.series([// Add retries
            (callback) => {
                this._client.addRetry(null, "Common.Group", "123", 3, callback);
            }, (callback) => {
                this._client.addRetry(null, "Common.AnotherGroup", "123", 3, callback);
            }, (callback) => {
                this._client.addRetry(null, "Common.Group", "ABC", 3, callback);
            }, (callback) => {
                this._client.addRetry(null, "Common.Group", "AAA", 3, callback);
            }, (callback) => {
                this._client.getRetries(null, FilterParams.fromTuples("group", "Common.Group"), new PagingParams(1, 10, false), (err, retries) => {
                    assert.isNull(err);
                    assert.isNotNull(retries.data);
                    assert.equal(2, retries.data.length);
                    callback();
                });

            }], done);
    }


    testRetries(done) {
        async.series([
            // Add retries
            (callback) => {
                this._client.addRetry(null, "Common.Group", "123", 3, callback);;
            }, (callback) => {
                this._client.addRetry(null, "Common.AnotherGroup", "123", 3, callback);
            }, (callback) => {
                this._client.addRetry(null, "Common.OtherGroup", "ABC", 3, callback);
            }, (callback) => {
                // Try to read 1 retry
                this._client.getRetryById(null, "Common.Group", "123", (err, retry) => {
                    assert.isNull(err);
                    assert.isNotNull(retry);
                    assert.equal(retry.id, "123");
                    assert.equal(retry.group, "Common.Group");
                    callback();
                });

            }, (callback) => {
                // Try to read 2 retry
                this._client.getRetryById(null, "Common.AnotherGroup", "123", (err, retry) => {
                    assert.isNull(err);
                    assert.isNotNull(retry);
                    assert.equal(retry.id, "123");
                    assert.equal(retry.group, "Common.AnotherGroup");
                    callback();
                });

            }, (callback) => {
                // Try to read 3 retry
                this._client.getRetryById(null, "Common.OtherGroup", "ABC", (err, retry) => {
                    assert.isNull(err);
                    assert.isNotNull(retry);
                    assert.equal(retry.id, "ABC");
                    assert.equal(retry.group, "Common.OtherGroup");
                    callback();
                });

            }, (callback) => {
                // Test non-exiting group
                this._client.getRetryById(null, "Common.Group1", "123", (err, retry) => {
                    assert.isNull(err);
                    assert.isNull(retry);
                    callback();
                });
            }, (callback) => {
                // Test non-exiting retry
                this._client.getRetryById(null, "Common.Group", "1234", (err, retry) => {
                    assert.isNull(err);
                    assert.isNull(retry);
                    callback();
                });

            }], done);
    }
}
