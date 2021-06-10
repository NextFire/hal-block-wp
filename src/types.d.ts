/**
 * TypeScript type definition for HAL block fields.
 * 
 * @see block.json
 */
export interface HALBlock {
    customSortField: string;
    desc: boolean;
    docTypes: string[];
    fq: string;
    groupField: string;
    groupLimit: string;
    portColl: string;
    q: string;
    sortField: string;
}

////////////////////
// TS def for HAL //
////////////////////
export interface HALGroup {
    groupValue: string;
    doclist: HALDoclist;
}

export interface HALDoclist {
    numFound: number;
    start: number;
    docs: HALDoc[];
}

export interface HALDoc {
    docType_s: string;
    label_bibtex: string;
    uri_s: string;
}
