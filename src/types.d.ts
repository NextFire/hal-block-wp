
/**
 * TypeScript type definition for HAL block fields.
 * 
 * @see block.json
 */
export interface HALBlock {
    portColl: string;
    q: string;
    sortField: string;
    customSortField: string;
    desc: boolean;
    allDocTypes: boolean;
    docTypes: Array<string>;
    fq: string;
    rows: number;
    customLink: string;
}

/**
 * TypeScript type definition for HAL json response fields.
 */
export interface HALResponse {
    docid: number;
    label_s: string;
    uri_s: string;
    authFullName_s: string[];
    title_s: string[];
    submittedDate_tdate: string;
}
