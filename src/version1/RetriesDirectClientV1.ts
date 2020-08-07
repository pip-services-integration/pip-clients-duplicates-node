import { FilterParams } from "pip-services3-commons-node";
import { PagingParams } from "pip-services3-commons-node";
import { Descriptor } from "pip-services3-commons-node";
import { DataPage } from "pip-services3-commons-node";

import { IRetriesClientV1 } from "./IRetriesClientV1";
import { DirectClient } from 'pip-services3-rpc-node';
import { RetryV1 } from "./RetryV1";

export class RetriesDirectClientV1 extends DirectClient<any> implements IRetriesClientV1 {

    public constructor() {
        super();
        this._dependencyResolver.put('controller', new Descriptor('pip-services-retries', 'controller', '*', '*', '1.0'));
    }

    addRetry(correlationId: string, group: string, id: string, timeToLive: number, callback: (err: any, retry: RetryV1) => void) {
        let timing = this.instrument(correlationId, 'retries.add_retry');
        this._controller.addRetry(correlationId, group, id, timeToLive, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }

    addRetries(correlationId: string, group: string, ids: string[], timeToLive: number, callback: (err: any, retry: RetryV1[]) => void) {
        let timing = this.instrument(correlationId, 'retries.add_retries');
        this._controller.addRetries(correlationId, group, ids, timeToLive, (err, items) => {
            timing.endTiming();
            callback(err, items);
        });
    }

    getRetryById(correlationId: string, group: string, id: string, callback: (err: any, retry: RetryV1) => void): void {
        let timing = this.instrument(correlationId, 'retries.get_retry_by_id');
        this._controller.getRetryById(correlationId, group, id, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }

    getRetryByIds(correlationId: string, group: string, ids: string[], callback: (err: any, retry: RetryV1[]) => void): void {
        let timing = this.instrument(correlationId, 'retries.get_retry_by_ids');
        this._controller.getRetryByIds(correlationId, group, ids, (err, items) => {
            timing.endTiming();
            callback(err, items);
        });
    }

    deleteRetry(correlationId: string, group: string, id: string, callback: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'retries.delete_retry');
        this._controller.deleteRetry(correlationId, group, id, (err) => {
            timing.endTiming();
            callback(err);
        });
    }

    getGroupNames(correlationId: string, callback: (err: any, items: string[]) => void) {
        let timing = this.instrument(correlationId, 'retries.get_groups_names');
        this._controller.getGroupNames(correlationId, (err, items) => {
            timing.endTiming();
            callback(err, items);
        });
    }

    getRetries(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<RetryV1>) => void) {
        let timing = this.instrument(correlationId, 'retries.get_retries');
        this._controller.getRetries(correlationId, filter, paging, (err, page) => {
            timing.endTiming();
            callback(err, page);
        });
    }
}