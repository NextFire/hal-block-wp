import { HALProps } from "./types";

const HAL_API = 'https://api.archives-ouvertes.fr/search/';

/////////////////////////
// Const for filtering //
/////////////////////////

/**
 * HAL document types.
 */
export const HALDocTypes = {
    'ART': 'Journal articles',
    'COMM': 'Conference papers',
    'COUV': 'Book section',
    'THESE': 'Theses',
    'OTHER': 'Other publications',
    'UNDEFINED': 'Preprints, Working Papers,...',
    'REPORT': 'Reports',
    'IMG': 'Photos',
    'OUV': 'Books',
    'POSTER': 'Poster communications',
    'DOUV': 'Directions of work or proceedings',
    'HDR': 'Habilitation à diriger des recherches',
    'PATENT': 'Patents',
    'VIDEO': 'Videos',
    'LECTURE': 'Lectures',
    'MAP': 'Maps',
    'SON': 'Audio',
} as const;

/**
 * HAL group presets fields.
 */
export const HALGroupFields = {
    'docType_s': 'Document type',
    'publicationDateY_i': 'Publication year',
} as const;

/**
 * HAL sort presets fields.
 */
export const HALSortFields = {
    'publicationDate_tdate': 'Publication date',
    'auth_sort': 'Author',
    'title_sort': 'Title',
} as const;

////////////////////
// Query building //
////////////////////

/**
 * Builds the url of HAL query.
 * 
 * @param attributes from the Gutenberg edit page
 * @returns url of the query
 */
export function queryBuilder(attributes: HALProps) {
    let url = HAL_API;

    // portal or COLLECTION
    if (attributes.portColl) url += attributes.portColl + '/';

    // query
    url += '?q=' + (attributes.q ? attributes.q : '*');
    // filters
    if (attributes.fq) url += '&fq=' + attributes.fq;

    // sort if not by relevance
    if (attributes.sortField) url += '&sort=' + attributes.sortField + ' ' + (attributes.desc ? 'desc' : 'asc');
    // then group
    url += '&group=true';
    url += '&group.field=' + attributes.groupField;
    url += '&group.limit=' + attributes.groupLimit;

    // include the essentials fields in response
    url += '&fl=docType_s,label_bibtex,uri_s';

    return url;
}
