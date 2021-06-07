/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
// import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
// @ts-ignore WP TS types def is broken
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

import { PanelBody, TextControl, SelectControl, RadioControl } from '@wordpress/components';

import * as React from 'react';

import { HALAttributes } from './attributes';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }: { attributes: HALAttributes; setAttributes: any }) {
    return (
        <>
            {/* Block preview */}
            <div {...useBlockProps()}>
                <em><a href={attributes.q} target="_blank">HAL publications</a> will appear here.</em>
            </div>
            {/* Block settings */}
            <InspectorControls>
                <PanelBody title="HAL search">
                    <TextControl
                        label="portal or COLLECTION"
                        help="@see https://api.archives-ouvertes.fr/docs/search/?#endpoints"
                        value={attributes.portColl}
                        onChange={value => setAttributes({ portColl: value })}
                    ></TextControl>
                    <TextControl
                        label="Query"
                        help="@see https://api.archives-ouvertes.fr/docs/search/?#q"
                        value={attributes.q}
                        onChange={value => setAttributes({ q: value })}
                    ></TextControl>
                    <SelectControl
                        label="Sort by"
                        value={attributes.sortField}
                        options={[
                            { value: '', label: 'Relevance' },
                            { value: 'ePublicationDate_tdate', label: 'ePublication date' },
                            { value: 'label_s', label: 'Reference' },
                            { value: 'docid', label: 'ID' },
                            { value: 'custom', label: 'Custom' },
                        ]}
                        onChange={value => setAttributes({ sortField: value })}
                    />
                    <TextControl
                        label="Sort by custom field"
                        help="@see https://api.archives-ouvertes.fr/docs/search/?schema=fields#fields"
                        value={attributes.sortField == 'custom' ? attributes.customSortField : ''}
                        onChange={value => setAttributes({ customSortField: value })}
                    ></TextControl>
                    <RadioControl
                        label="Order"
                        selected={attributes.desc ? 'yes' : 'no'}
                        options={[
                            { label: 'Descending', value: 'yes' },
                            { label: 'Ascending', value: 'no' },
                        ]}
                        onChange={value => setAttributes({ desc: value == 'yes' })}
                    />
                    <TextControl
                        label="Filter"
                        help="@see https://api.archives-ouvertes.fr/docs/search/?#fq"
                        value={attributes.fq}
                        onChange={value => setAttributes({ fq: value })}
                    ></TextControl>
                    <TextControl
                        label="Number of documents"
                        value={attributes.rows}
                        onChange={value => setAttributes({ rows: value })}
                    ></TextControl>
                </PanelBody>
            </InspectorControls>
        </>
    );
}
