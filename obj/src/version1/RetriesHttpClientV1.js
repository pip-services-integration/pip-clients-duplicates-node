"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class RetriesHttpClientV1 extends pip_services3_rpc_node_1.CommandableHttpClient {
    constructor() {
        super('v1/retries');
    }
    addRetry(correlationId, collection, id, timeToLive, callback) {
        this.callCommand('add_retry', correlationId, {
            id: id,
            collection: collection,
            ttl: timeToLive
        }, callback);
    }
    addRetries(correlationId, collection, ids, timeToLive, callback) {
        this.callCommand('add_retries', correlationId, {
            ids: ids,
            collection: collection,
            ttl: timeToLive
        }, callback);
    }
    getRetryById(correlationId, collection, id, callback) {
        this.callCommand('get_retry_by_id', correlationId, {
            id: id,
            collection: collection
        }, callback);
    }
    getRetryByIds(correlationId, collection, ids, callback) {
        this.callCommand('get_retry_by_ids', correlationId, {
            ids: ids,
            collection: collection
        }, callback);
    }
    deleteRetry(correlationId, collection, id, callback) {
        this.callCommand('delete_retry', correlationId, {
            ids: id,
            collection: collection
        }, (err, res) => {
            callback(err);
        });
    }
    getCollectionNames(correlationId, callback) {
        this.callCommand('get_collection_names', correlationId, {}, callback);
    }
    getRetries(correlationId, filter, paging, callback) {
        this.callCommand('get_retries', correlationId, {
            filter: filter,
            paging: paging
        }, callback);
    }
}
exports.RetriesHttpClientV1 = RetriesHttpClientV1;
//# sourceMappingURL=RetriesHttpClientV1.js.map