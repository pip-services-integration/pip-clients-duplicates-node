import { IRetriesClient } from "./IRetriesClient";
import { FilterParams, PagingParams, Descriptor, DataPage } from "pip-services3-commons-node";
import { DirectClient } from 'pip-services3-rpc-node';
import { RetryV1 } from "./RetryV1";

export class RetriesDirectClientV1 extends DirectClient<any> implements IRetriesClient {

    public constructor() {
        super();
        this._dependencyResolver.put('controller', new Descriptor('pip-services-retries', 'controller', '*', '*', '1.0'));
    }

    addRetry(correlationId: string, collection: string, id: string, timeToLive: number, callback: (err: any, retry: RetryV1) => void) {
        let timing = this.instrument(correlationId, 'retries.add_retry');
        this._controller.addRetry(correlationId, collection, id, timeToLive, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }

    addRetries(correlationId: string, collection: string, ids: string[], timeToLive: number, callback: (err: any, retry: RetryV1[]) => void) {
        let timing = this.instrument(correlationId, 'retries.add_retries');
        this._controller.addRetries(correlationId, collection, ids, timeToLive, (err, items) => {
            timing.endTiming();
            callback(err, items);
        });
    }

    getRetryById(correlationId: string, collection: string, id: string, callback: (err: any, retry: RetryV1) => void): void {
        let timing = this.instrument(correlationId, 'retries.get_retry_by_id');
        this._controller.getRetryById(correlationId, collection, id, (err, item) => {
            timing.endTiming();
            callback(err, item);
        });
    }

    getRetryByIds(correlationId: string, collection: string, ids: string[], callback: (err: any, retry: RetryV1[]) => void): void {
        let timing = this.instrument(correlationId, 'retries.get_retry_by_ids');
        this._controller.getRetryByIds(correlationId, collection, ids, (err, items) => {
            timing.endTiming();
            callback(err, items);
        });
    }

    deleteRetry(correlationId: string, collection: string, id: string, callback: (err: any) => void): void {
        let timing = this.instrument(correlationId, 'retries.delete_retry');
        this._controller.deleteRetry(correlationId, collection, id, (err) => {
            timing.endTiming();
            callback(err);
        });
    }

    getCollectionNames(correlationId: string, callback: (err: any, items: string[]) => void) {
        let timing = this.instrument(correlationId, 'retries.get_collections_names');
        this._controller.getCollectionNames(correlationId, (err, items) => {
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