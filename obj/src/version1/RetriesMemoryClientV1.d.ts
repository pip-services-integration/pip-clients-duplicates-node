import { IRetriesClient } from "./IRetriesClient";
import { FilterParams, PagingParams, DataPage } from "pip-services3-commons-node";
import { RetryV1 } from "./RetryV1";
export declare class RetriesMemoryClientV1 implements IRetriesClient {
    private _maxPageSize;
    private _items;
    private readonly _defaultTTL;
    constructor(...items: RetryV1[]);
    private composeFilter;
    private createRetries;
    addRetry(correlationId: string, collection: string, id: string, timeToLive: number, callback: (err: any, retry: RetryV1) => void): void;
    addRetries(correlationId: string, collection: string, ids: string[], timeToLive: number, callback: (err: any, retry: RetryV1[]) => void): RetryV1[];
    getRetryById(correlationId: string, collection: string, id: string, callback: (err: any, retry: RetryV1) => void): void;
    getRetryByIds(correlationId: string, collection: string, ids: string[], callback: (err: any, retry: RetryV1[]) => void): void;
    deleteRetry(correlationId: string, collection: string, id: string, callback: (err: any) => void): void;
    getCollectionNames(correlationId: string, callback: (err: any, items: string[]) => void): void;
    getRetries(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<RetryV1>) => void): void;
    private createRetry;
    private updateRetry;
}
