import { HALProps } from "./types";

const HAL_API = 'https://api.archives-ouvertes.fr/search/';

/**
 * HAL sort presets fields.
 */
export const halSortFields: { [key: string]: string } = {
    '': 'Relevance',
    'submittedDate_tdate': 'Submitted date',
    'publicationDate_tdate': 'Publication date',
    'producedDate_tdate': 'Produced date',
    'auth_sort': 'Author',
    'title_sort': 'Title',
    'docid': 'ID',
}

/**
 * HAL group presets fields.
 */
export const halGroupFields: { [key: string]: string } = {
    'docType_s': 'Document type',
    'submittedDateY_i': 'Submitted year',
    'publicationDateY_i': 'Publication year',
    'producedDateY_i': 'Produced year',
}

/**
 * HAL document types.
 */
export const halDocTypes: { [key: string]: string } = {
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
}

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
    if (attributes.sortField)
        url += '&sort=' + attributes.sortField + ' ' + (attributes.desc ? 'desc' : 'asc');
    // then group
    url += '&group=true';
    url += '&group.field=' + attributes.groupField;
    url += '&group.limit=' + attributes.groupLimit;
    
    // include the essentials fields in response
    url += '&fl=docType_s,label_bibtex,uri_s';

    return url;
}
