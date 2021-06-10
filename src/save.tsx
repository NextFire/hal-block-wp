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
import { useBlockProps } from "@wordpress/block-editor";

import * as React from "react";

import { halDocTypes, halGroupFields, halSortFields, queryBuilder } from "./hal";
import { HALBlock } from "./types";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }: { attributes: HALBlock }) {
    return (
        <div>
            <strong>[Grouped by {halGroupFields[attributes.groupField].toLowerCase()} then sorted by {halSortFields[attributes.sortField].toLowerCase()} {attributes.desc ? '↓' : '↑'}]</strong>
            <div {...useBlockProps.save()}
                url={queryBuilder(attributes)}
                docTypesStr={(attributes.docTypes.length == 0 ? Object.keys(halDocTypes) : attributes.docTypes).join()}
            ><em>Loading HAL...</em></div>
        </div>
    );
}
