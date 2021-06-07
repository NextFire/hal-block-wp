import { HALBlock } from "./types";

const HAL_API = 'https://api.archives-ouvertes.fr/search/';
const HAL_WEB = 'https://hal.archives-ouvertes.fr/search/index/';

/**
 * HAL search presets fields.
 */
export const halSearchFields = {
    '': 'Relevance',
    'auth_sort': 'Author',
    'title_sort': 'Title',
    'producedDate_tdate': 'Produced date',
    'submittedDate_tdate': 'Submitted date',
    'docid': 'ID',
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
 * @param api should it returns the url for the api or for the web
 * @returns url of the query
 */
export function queryBuilder(attributes: HALBlock, api = true) {
    let url = (api ? HAL_API : HAL_WEB);

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
    if (api) url += '&fl=*';

    return url;
}
