"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class RetriesHttpClientV1 extends pip_services3_rpc_node_1.CommandableHttpClient {
    constructor() {
        super('v1/retries');
    }
    addRetry(correlationId, group, id, timeToLive, callback) {
        this.callCommand('add_retry', correlationId, {
            id: id,
            group: group,
            ttl: timeToLive
        }, callback);
    }
    addRetries(correlationId, group, ids, timeToLive, callback) {
        this.callCommand('add_retries', correlationId, {
            ids: ids,
            group: group,
            ttl: timeToLive
        }, callback);
    }
    getRetryById(correlationId, group, id, callback) {
        this.callCommand('get_retry_by_id', correlationId, {
            id: id,
            group: group
        }, callback);
    }
    getRetryByIds(correlationId, group, ids, callback) {
        this.callCommand('get_retry_by_ids', correlationId, {
            ids: ids,
            group: group
        }, callback);
    }
    deleteRetry(correlationId, group, id, callback) {
        this.callCommand('delete_retry', correlationId, {
            ids: id,
            group: group
        }, (err, res) => {
            callback(err);
        });
    }
    getGroupNames(correlationId, callback) {
        this.callCommand('get_group_names', correlationId, {}, callback);
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