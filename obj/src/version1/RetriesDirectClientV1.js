"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class RetriesDirectClientV1 extends pip_services3_rpc_node_1.DirectClient {
    constructor() {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-retries', 'controller', '*', '*', '1.0'));
    }
    addRetry(correlationId, group, id, timeToLive, callback) {
        let timing = this.instrument(correlationId, 'retries.add_retry');
        this._controller.addRetry(correlationId, group, id, timeToLive, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }
    addRetries(correlationId, group, ids, timeToLive, callback) {
        let timing = this.instrument(correlationId, 'retries.add_retries');
        this._controller.addRetries(correlationId, group, ids, timeToLive, (err, items) => {
            timing.endTiming();
            callback(err, items);
        });
    }
    getRetryById(correlationId, group, id, callback) {
        let timing = this.instrument(correlationId, 'retries.get_retry_by_id');
        this._controller.getRetryById(correlationId, group, id, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }
    getRetryByIds(correlationId, group, ids, callback) {
        let timing = this.instrument(correlationId, 'retries.get_retry_by_ids');
        this._controller.getRetryByIds(correlationId, group, ids, (err, items) => {
            timing.endTiming();
            callback(err, items);
        });
    }
    deleteRetry(correlationId, group, id, callback) {
        let timing = this.instrument(correlationId, 'retries.delete_retry');
        this._controller.deleteRetry(correlationId, group, id, (err) => {
            timing.endTiming();
            callback(err);
        });
    }
    getGroupNames(correlationId, callback) {
        let timing = this.instrument(correlationId, 'retries.get_groups_names');
        this._controller.getGroupNames(correlationId, (err, items) => {
            timing.endTiming();
            callback(err, items);
        });
    }
    getRetries(correlationId, filter, paging, callback) {
        let timing = this.instrument(correlationId, 'retries.get_retries');
        this._controller.getRetries(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }
}
exports.RetriesDirectClientV1 = RetriesDirectClientV1;
//# sourceMappingURL=RetriesDirectClientV1.js.map