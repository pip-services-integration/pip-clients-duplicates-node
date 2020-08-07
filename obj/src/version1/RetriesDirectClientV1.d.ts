import { FilterParams } from "pip-services3-commons-node";
import { PagingParams } from "pip-services3-commons-node";
import { DataPage } from "pip-services3-commons-node";
import { IRetriesClientV1 } from "./IRetriesClientV1";
import { DirectClient } from 'pip-services3-rpc-node';
import { RetryV1 } from "./RetryV1";
export declare class RetriesDirectClientV1 extends DirectClient<any> implements IRetriesClientV1 {
    constructor();
    addRetry(correlationId: string, group: string, id: string, timeToLive: number, callback: (err: any, retry: RetryV1) => void): void;
    addRetries(correlationId: string, group: string, ids: string[], timeToLive: number, callback: (err: any, retry: RetryV1[]) => void): void;
    getRetryById(correlationId: string, group: string, id: string, callback: (err: any, retry: RetryV1) => void): void;
    getRetryByIds(correlationId: string, group: string, ids: string[], callback: (err: any, retry: RetryV1[]) => void): void;
    deleteRetry(correlationId: string, group: string, id: string, callback: (err: any) => void): void;
    getGroupNames(correlationId: string, callback: (err: any, items: string[]) => void): void;
    getRetries(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<RetryV1>) => void): void;
}
