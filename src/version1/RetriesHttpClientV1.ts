import { IRetriesClient } from "./IRetriesClient";
import { FilterParams, PagingParams, DataPage } from "pip-services3-commons-node";
import { CommandableHttpClient } from 'pip-services3-rpc-node';
import { RetryV1 } from "./RetryV1";

export class RetriesHttpClientV1 extends CommandableHttpClient implements IRetriesClient {

    public constructor() {
        super('v1/retries');
    }

    addRetry(correlationId: string, collection: string, id: string, timeToLive: number, callback: (err: any, retry: RetryV1) => void) {
        this.callCommand(
            'add_retry',
            correlationId,
            {
                id: id,
                collection: collection,
                ttl: timeToLive
            },
            callback
        );
    }

    addRetries(correlationId: string, collection: string, ids: string[], timeToLive: number, callback: (err: any, retry: RetryV1[]) => void) {
        this.callCommand(
            'add_retries',
            correlationId,
            {
                ids: ids,
                collection: collection,
                ttl: timeToLive
            },
            callback
        );
    }
    getRetryById(correlationId: string, collection: string, id: string, callback: (err: any, retry: RetryV1) => void): void {
        this.callCommand(
            'get_retry_by_id',
            correlationId,
            {
                id: id,
                collection: collection
            },
            callback
        );
    }

    getRetryByIds(correlationId: string, collection: string, ids: string[], callback: (err: any, retry: RetryV1[]) => void): void {
        this.callCommand(
            'get_retry_by_ids',
            correlationId,
            {
                ids: ids,
                collection: collection
            },
            callback
        );
    }

    deleteRetry(correlationId: string, collection: string, id: string, callback: (err: any) => void): void {
        this.callCommand(
            'delete_retry',
            correlationId,
            {
                ids: id,
                collection: collection
            },
            (err, res) => {
                callback(err);
            }
        );
    }

    getCollectionNames(correlationId: string, callback: (err: any, items: string[]) => void) {
        this.callCommand(
            'get_collection_names',
            correlationId,
            {},
            callback
        );
    }

    getRetries(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<RetryV1>) => void) {
        this.callCommand(
            'get_retries',
            correlationId,
            {
                filter: filter,
                paging: paging
            },
            callback
        );
    }

}