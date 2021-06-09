import { HALBlock } from "./types";

const HAL_API = 'https://api.archives-ouvertes.fr/search/';

/**
 * HAL search presets fields.
 */
export const halSearchFields = {
    '': 'Relevance',
    'auth_sort': 'Author',
    'title_sort': 'Title',
    'producedDate_tdate': 'Produced date',
    'submittedDate_tdate': 'Submitted date',
    'docType_s': 'Document type',
    'docid': 'ID',
    'custom': 'Custom',
}

/**
 * HAL group presets fields.
 */
export const halGroupFields = {
    '': 'None',
    'submittedDateY_i': 'Submitted Year',
    'docType_s': 'Document type',
    'custom': 'Custom',
}

/**
 * HAL document types.
 */
export const halDocTypes = {
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
    'SOFTWARE': 'Software',
    'MAP': 'Maps',
    'SON': 'Audio',
}

/**
 * Builds the url of HAL query.
 * 
 * @param attributes from the Gutenberg edit page
 * @returns url of the query
 */
export function queryBuilder(attributes: HALBlock) {
    if (attributes.customLink) {
        return attributes.customLink;
    }

    let url = HAL_API;

    // portal or COLLECTION
    if (attributes.portColl) url += attributes.portColl + '/';

    // Parameters
    // query
    url += '?q=' + (attributes.q ? attributes.q : '*');
    // sort if not by relevance
    if (attributes.sortField)
        url += '&sort='
            + (attributes.sortField == 'custom' ? attributes.customSortField : attributes.sortField)
            + ' ' + (attributes.desc ? 'desc' : 'asc');
    // filters
    if (attributes.fq) url += '&fq=' + attributes.fq;
    // number of docs
    if (0 < attributes.rows && attributes.rows <= 10000) url += '&rows=' + attributes.rows;
    // doctypes
    if (!attributes.allDocTypes) url += '&docType_s=' + attributes.docTypes.join(' OR ');

    // include all fields in response
    url += '&fl=*';

    return url;
}
