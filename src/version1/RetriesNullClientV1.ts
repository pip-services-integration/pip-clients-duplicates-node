import { IRetriesClient } from "./IRetriesClient";
import { FilterParams, PagingParams, DataPage } from "pip-services3-commons-node";
import { RetryV1 } from "./RetryV1";


export class RetriesNullClientV1 implements IRetriesClient {

    getCollectionNames(correlationId: string, callback: (err: any, items: string[]) => void) {
        callback(null, new Array<string>());
    }
    getRetries(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<RetryV1>) => void) {
        callback(null, new DataPage<RetryV1>());
    }
    addRetry(correlationId: string, collection: string, id: string, timeToLive: number, callback: (err: any, retry: RetryV1) => void) {
        callback(null, null);
    }
    addRetries(correlationId: string, collection: string, ids: string[], timeToLive: number, callback: (err: any, retry: RetryV1[]) => void) {
        callback(null, new Array<RetryV1>());
    }
    getRetryById(correlationId: string, collection: string, id: string, callback: (err: any, retry: RetryV1) => void): void {
        callback(null, null);
    }
    getRetryByIds(correlationId: string, collection: string, ids: string[], callback: (err: any, retry: RetryV1[]) => void): void {
        callback(null, null);
    }
    deleteRetry(correlationId: string, collection: string, id: string, callback: (err: any) => void): void {
        callback(null);
    }
}