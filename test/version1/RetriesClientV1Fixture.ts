let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { IRetriesClient } from '../../src/version1/IRetriesClient';

export class RetriesClientV1Fixture {
    private _client: IRetriesClient;

    constructor(persistence) {
        assert.isNotNull(persistence);
        this._client = persistence;
    }

    testGetRetryCollections(done) {
        async.series([
            // Add retries
            (callback) => {
                this._client.addRetry(null, "Common.Collection", "123", 3, callback);
            }, (callback) => {
                this._client.addRetry(null, "Common.AnotherCollection", "123", 3, callback);
            }, (callback) => {
                this._client.addRetry(null, "Common.Collection", "ABC", 3, callback);
            }, (callback) => {

                this._client.getCollectionNames(null, (err, items) => {
                    assert.isNull(err);
                    assert.equal(2, items.length);
                    assert.include(items, "Common.Collection");
                    assert.include(items, "Common.AnotherCollection");
                    callback();
                });

            }], done);
    }

    testGetRetries(done) {
        async.series([// Add retries
            (callback) => {
                this._client.addRetry(null, "Common.Collection", "123", 3, callback);
            }, (callback) => {
                this._client.addRetry(null, "Common.AnotherCollection", "123", 3, callback);
            }, (callback) => {
                this._client.addRetry(null, "Common.Collection", "ABC", 3, callback);
            }, (callback) => {
                this._client.addRetry(null, "Common.Collection", "AAA", 3, callback);
            }, (callback) => {
                this._client.getRetries(null, FilterParams.fromTuples("collection", "Common.Collection"), new PagingParams(1, 10, false), (err, retries) => {
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
                this._client.addRetry(null, "Common.Collection", "123", 3, callback);;
            }, (callback) => {
                this._client.addRetry(null, "Common.AnotherCollection", "123", 3, callback);
            }, (callback) => {
                this._client.addRetry(null, "Common.OtherCollection", "ABC", 3, callback);
            }, (callback) => {
                // Try to read 1 retry
                this._client.getRetryById(null, "Common.Collection", "123", (err, retry) => {
                    assert.isNull(err);
                    assert.isNotNull(retry);
                    assert.equal(retry.id, "123");
                    assert.equal(retry.collection, "Common.Collection");
                    callback();
                });

            }, (callback) => {
                // Try to read 2 retry
                this._client.getRetryById(null, "Common.AnotherCollection", "123", (err, retry) => {
                    assert.isNull(err);
                    assert.isNotNull(retry);
                    assert.equal(retry.id, "123");
                    assert.equal(retry.collection, "Common.AnotherCollection");
                    callback();
                });

            }, (callback) => {
                // Try to read 3 retry
                this._client.getRetryById(null, "Common.OtherCollection", "ABC", (err, retry) => {
                    assert.isNull(err);
                    assert.isNotNull(retry);
                    assert.equal(retry.id, "ABC");
                    assert.equal(retry.collection, "Common.OtherCollection");
                    callback();
                });

            }, (callback) => {
                // Test non-exiting collection
                this._client.getRetryById(null, "Common.Collection1", "123", (err, retry) => {
                    assert.isNull(err);
                    assert.isNull(retry);
                    callback();
                });
            }, (callback) => {
                // Test non-exiting retry
                this._client.getRetryById(null, "Common.Collection", "1234", (err, retry) => {
                    assert.isNull(err);
                    assert.isNull(retry);
                    callback();
                });

            }], done);
    }
}
