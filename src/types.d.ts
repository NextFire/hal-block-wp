/**
 * TypeScript type definition for HAL block fields.
 * 
 * @see block.json
 */
export interface HALBlock {
    allDocTypes: boolean;
    customLink: string;
    customSortField: string;
    desc: boolean;
    docTypes: string[];
    fq: string;
    groupField: string;
    portColl: string;
    q: string;
    rows: number;
    sortField: string;
}

/**
 * TypeScript type definition for HAL json response fields.
 */
export interface HALResponse {
    label_bibtex: string;
    uri_s: string;
}
