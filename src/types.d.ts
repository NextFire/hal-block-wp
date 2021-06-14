import { HALDocTypes, HALGroupFields, HALSortFields } from "./hal";

type HALDocTypesKeys = keyof typeof HALDocTypes;
type HALGroupFieldsKeys = keyof typeof HALGroupFields;
type HALSortFieldsKeys = keyof typeof HALSortFields;

//////////////////////////////////////
// TS interfaces for React frontend //
//////////////////////////////////////

/**
 * TypeScript type definition for HAL block fields.
 * 
 * @see block.json
 */
export interface HALProps {
    desc: boolean;
    docTypes: HALDocTypesKeys[];
    fq: string;
    groupField: HALGroupFieldsKeys;
    groupLimit: string;
    portColl: string;
    q: string;
    sortField: HALSortFieldsKeys;
}

/**
 * 
 */
export interface HALState {
    desc: boolean;
    groupField: HALGroupFieldsKeys;
    sortField: HALSortFieldsKeys;
}

/////////////////////////////////
// TS def for HAL API response //
/////////////////////////////////

/**
 * 
 */
export interface HALGroup {
    groupValue: HALDocTypesKeys | string;
    doclist: HALDoclist;
}

/**
 * 
 */
export interface HALDoclist {
    numFound: number;
    start: number;
    docs: HALDoc[];
}

/**
 * 
 */
export interface HALDoc {
    docType_s: HALDocTypesKeys;
    label_bibtex: string;
    uri_s: string;
}
