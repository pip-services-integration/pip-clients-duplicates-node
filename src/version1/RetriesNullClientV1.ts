import { FilterParams } from "pip-services3-commons-node";
import { PagingParams } from "pip-services3-commons-node";
import { DataPage } from "pip-services3-commons-node";

import { IRetriesClientV1 } from "./IRetriesClientV1";
import { RetryV1 } from "./RetryV1";


export class RetriesNullClientV1 implements IRetriesClientV1 {
    getGroupNames(correlationId: string, callback: (err: any, items: string[]) => void) {
        callback(null, new Array<string>());
    }

    getRetries(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<RetryV1>) => void) {
        callback(null, new DataPage<RetryV1>());
    }

    addRetry(correlationId: string, group: string, id: string, timeToLive: number, callback: (err: any, retry: RetryV1) => void) {
        callback(null, null);
    }

    addRetries(correlationId: string, group: string, ids: string[], timeToLive: number, callback: (err: any, retry: RetryV1[]) => void) {
        callback(null, new Array<RetryV1>());
    }

    getRetryById(correlationId: string, group: string, id: string, callback: (err: any, retry: RetryV1) => void): void {
        callback(null, null);
    }

    getRetryByIds(correlationId: string, group: string, ids: string[], callback: (err: any, retry: RetryV1[]) => void): void {
        callback(null, null);
    }

    deleteRetry(correlationId: string, group: string, id: string, callback: (err: any) => void): void {
        callback(null);
    }
}