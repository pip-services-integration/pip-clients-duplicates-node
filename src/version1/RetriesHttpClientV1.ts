import { FilterParams } from "pip-services3-commons-node";
import { PagingParams } from "pip-services3-commons-node";
import { DataPage } from "pip-services3-commons-node";
import { CommandableHttpClient } from 'pip-services3-rpc-node';

import { IRetriesClientV1 } from "./IRetriesClientV1";
import { RetryV1 } from "./RetryV1";

export class RetriesHttpClientV1 extends CommandableHttpClient implements IRetriesClientV1 {

    public constructor() {
        super('v1/retries');
    }

    addRetry(correlationId: string, group: string, id: string, timeToLive: number, callback: (err: any, retry: RetryV1) => void) {
        this.callCommand(
            'add_retry',
            correlationId,
            {
                id: id,
                group: group,
                ttl: timeToLive
            },
            callback
        );
    }

    addRetries(correlationId: string, group: string, ids: string[], timeToLive: number, callback: (err: any, retry: RetryV1[]) => void) {
        this.callCommand(
            'add_retries',
            correlationId,
            {
                ids: ids,
                group: group,
                ttl: timeToLive
            },
            callback
        );
    }
    getRetryById(correlationId: string, group: string, id: string, callback: (err: any, retry: RetryV1) => void): void {
        this.callCommand(
            'get_retry_by_id',
            correlationId,
            {
                id: id,
                group: group
            },
            callback
        );
    }

    getRetryByIds(correlationId: string, group: string, ids: string[], callback: (err: any, retry: RetryV1[]) => void): void {
        this.callCommand(
            'get_retry_by_ids',
            correlationId,
            {
                ids: ids,
                group: group
            },
            callback
        );
    }

    deleteRetry(correlationId: string, group: string, id: string, callback: (err: any) => void): void {
        this.callCommand(
            'delete_retry',
            correlationId,
            {
                ids: id,
                group: group
            },
            (err, res) => {
                callback(err);
            }
        );
    }

    getGroupNames(correlationId: string, callback: (err: any, items: string[]) => void) {
        this.callCommand(
            'get_group_names',
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