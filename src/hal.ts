/**
 * TypeScript type definition for HAL block fields.
 */
export interface HALBlock {
    portColl: string,
    q: string,
    sortField: string;
    customSortField: string;
    desc: boolean;
    allDocTypes: boolean;
    docTypes: Array<string>;
    fq: string;
    rows: number;
}

/**
 * HAL search presets fields
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
 * HAL document types
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
 * TypeScript type definition for HAL json response fields.
 */
export interface HALResponse {
    docid: number;
    label_s: string;
    uri_s: string;
}
