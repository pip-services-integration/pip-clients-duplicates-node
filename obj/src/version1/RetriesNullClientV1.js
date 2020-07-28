"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
class RetriesNullClientV1 {
    getCollectionNames(correlationId, callback) {
        callback(null, new Array());
    }
    getRetries(correlationId, filter, paging, callback) {
        callback(null, new pip_services3_commons_node_1.DataPage());
    }
    addRetry(correlationId, collection, id, timeToLive, callback) {
        callback(null, null);
    }
    addRetries(correlationId, collection, ids, timeToLive, callback) {
        callback(null, new Array());
    }
    getRetryById(correlationId, collection, id, callback) {
        callback(null, null);
    }
    getRetryByIds(correlationId, collection, ids, callback) {
        callback(null, null);
    }
    deleteRetry(correlationId, collection, id, callback) {
        callback(null);
    }
}
exports.RetriesNullClientV1 = RetriesNullClientV1;
//# sourceMappingURL=RetriesNullClientV1.js.map