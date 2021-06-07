/**
 * TS type def for HAL block attributes.
 */
export interface HALAttributes {
    portColl: string,
    q: string,
    sortField: string;
    customSortField: string;
    desc: boolean;
    fq: string;
    rows: number;
}
