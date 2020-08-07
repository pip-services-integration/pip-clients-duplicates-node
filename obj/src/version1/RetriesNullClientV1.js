"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
class RetriesNullClientV1 {
    getGroupNames(correlationId, callback) {
        callback(null, new Array());
    }
    getRetries(correlationId, filter, paging, callback) {
        callback(null, new pip_services3_commons_node_1.DataPage());
    }
    addRetry(correlationId, group, id, timeToLive, callback) {
        callback(null, null);
    }
    addRetries(correlationId, group, ids, timeToLive, callback) {
        callback(null, new Array());
    }
    getRetryById(correlationId, group, id, callback) {
        callback(null, null);
    }
    getRetryByIds(correlationId, group, ids, callback) {
        callback(null, null);
    }
    deleteRetry(correlationId, group, id, callback) {
        callback(null);
    }
}
exports.RetriesNullClientV1 = RetriesNullClientV1;
//# sourceMappingURL=RetriesNullClientV1.js.map