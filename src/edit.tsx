/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
// import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
// @ts-ignore WP TS types def is broken
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";

import { CheckboxControl, PanelBody, RadioControl, SelectControl, TextControl } from "@wordpress/components";

import * as React from "react";

import { halDocTypes, halSearchFields, queryBuilder } from "./hal";
import { HALBlock } from "./types";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }: { attributes: HALBlock; setAttributes: any }) {
    return (
        <>
            {/* Block preview */}
            <div {...useBlockProps()}>
                <em>HAL publications will appear here</em><br />
                <a href={queryBuilder(attributes)} target='_blank'>Preview results in a new tab (JSON)</a>
            </div>
            {/* Block settings */}
            <InspectorControls>
                {/* Search */}
                <PanelBody title='HAL search'>
                    <h2><em>All fields are optionals.</em></h2>
                    <TextControl
                        label='portal or COLLECTION'
                        help='@see https://api.archives-ouvertes.fr/docs/search/?#endpoints'
                        value={attributes.portColl}
                        onChange={value => setAttributes({ portColl: value })}
                    ></TextControl>
                    <TextControl
                        label='Query'
                        help='@see https://api.archives-ouvertes.fr/docs/search/?#q'
                        value={attributes.q}
                        onChange={value => setAttributes({ q: value })}
                    ></TextControl>
                    <SelectControl
                        label='Sort by'
                        value={attributes.sortField}
                        options={
                            (() => {
                                let array: { value: string; label: string; }[] = [];
                                Object.entries(halSearchFields).forEach(([key, desc]: [string, string]) => {
                                    array.push({ value: key, label: desc });
                                });
                                return array;
                            })()
                        }
                        onChange={value => setAttributes({ sortField: value })}
                    />
                    {attributes.sortField == 'custom' &&
                        <TextControl
                            label='Sort by custom field'
                            help='@see https://api.archives-ouvertes.fr/docs/search/?schema=fields#fields'
                            value={attributes.customSortField}
                            onChange={value => setAttributes({ customSortField: value })}
                        ></TextControl>
                    }
                    {attributes.sortField &&
                        <RadioControl
                            label='Order'
                            selected={attributes.desc ? 'yes' : 'no'}
                            options={[
                                { label: 'Descending', value: 'yes' },
                                { label: 'Ascending', value: 'no' },
                            ]}
                            onChange={value => setAttributes({ desc: value == 'yes' })}
                        />
                    }
                    <TextControl
                        label='Filter'
                        help='@see https://api.archives-ouvertes.fr/docs/search/?#fq'
                        value={attributes.fq}
                        onChange={value => setAttributes({ fq: value })}
                    ></TextControl>
                    <TextControl
                        label='Number of documents'
                        type='number'
                        value={attributes.rows}
                        onChange={value => setAttributes({ rows: value })}
                    ></TextControl>
                </PanelBody>
                {/* Documents */}
                <PanelBody title='Document types'>
                    <CheckboxControl
                        label='All documents'
                        checked={attributes.allDocTypes}
                        onChange={value => setAttributes({ allDocTypes: value })}
                    ></CheckboxControl>
                    {!attributes.allDocTypes &&
                        (() => {
                            let array: JSX.Element[] = [];
                            Object.entries(halDocTypes).forEach(([key, desc]: [string, string]) => {
                                array.push(
                                    <CheckboxControl
                                        label={desc}
                                        checked={attributes.docTypes.includes(key)}
                                        onChange={checked => {
                                            let docTypes = attributes.docTypes.slice();
                                            if (checked) {
                                                if (!docTypes.includes(key)) {
                                                    docTypes.push(key);
                                                }
                                            } else {
                                                docTypes = docTypes.filter(value => value != key);
                                            }
                                            setAttributes({ docTypes: docTypes });
                                        }}
                                    ></CheckboxControl>);
                            });
                            return array;
                        })()
                    }
                </PanelBody>
            </InspectorControls>
        </>
    );
}
