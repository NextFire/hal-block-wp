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
// @ts-ignore
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

import { PanelBody, TextControl } from '@wordpress/components';

import * as React from 'react';


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
// @ts-ignore
export default function Edit({ attributes, setAttributes }) {
    function onChangeQuery(value: any) {
        setAttributes({ query: value });
    }

    return (
        <>
            <div {...useBlockProps()}>
                <em><a href={attributes.query} target="_blank">HAL publications</a> will appear here.</em>
            </div>
            <InspectorControls>
                <PanelBody title="Filters">
                    <TextControl label="Query" value={attributes.query} onChange={onChangeQuery}></TextControl>
                </PanelBody>
            </InspectorControls>
        </>
    );
}
