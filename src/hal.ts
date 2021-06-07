/**
 * TypeScript type definition for HAL block fields.
 */
export interface HALBlock {
    portColl: string,
    q: string,
    sortField: string;
    customSortField: string;
    desc: boolean;
    fq: string;
    rows: number;
}

/**
 * TypeScript type definition for HAL json response fields.
 */
export interface HALResponse {
    docid: number;
    label_s: string;
    uri_s: string;
}
