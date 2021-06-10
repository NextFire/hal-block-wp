import * as React from "react";
import * as ReactDOM from "react-dom";
import { halDocTypes } from "./hal";
import { HALDoc, HALGroup } from "./types";
const Cite = require('citation-js');

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('div.wp-block-halb-hal-block').forEach(async block => {
        try {
            let response = await fetch(block.getAttribute('url'));
            let json = await response.json();
            let groups = json.grouped[Object.keys(json.grouped)[0]].groups;
            let docTypes = block.getAttribute('docTypesStr').split(',');
            ReactDOM.render(
                <HALDiv
                    groups={groups}
                    docTypes={docTypes}
                />, block);
        } catch (error) {
            ReactDOM.render(
                <p className='hal-error'>
                    An error occured when fetching<br />
                    {block.getAttribute('url')}
                    <br /><br />
                    {error}
                </p >, block);
        }
    });
});

function HALDiv({ groups, docTypes }: { groups: HALGroup[], docTypes: string[] }) {
    let subdivs: JSX.Element[] = [];
    groups.forEach(group => {
        if (/^\d+$/.test(group.groupValue) || docTypes.includes(group.groupValue)) {
            // Friendly name
            let groupName;
            if (docTypes.includes(group.groupValue)) {
                groupName = halDocTypes[group.groupValue];
            } else {
                groupName = group.groupValue;
            }

            // Rows
            let rows: JSX.Element[] = [];
            group.doclist.docs.forEach(doc => {
                if (docTypes.includes(doc.docType_s)) {
                    rows.push(<DocRow doc={doc}></DocRow>)
                }
            });

            // Keep group if there is at least one item
            if (rows.length > 0) {
                subdivs.push(
                    <div>
                        <h2>{groupName}</h2>
                        <ul>
                            {rows}
                        </ul>
                    </div>
                );
            }
        }
    })

    return (
        <div>
            {subdivs}
        </div>
    );
}

function DocRow({ doc }: { doc: HALDoc }) {
    let apa = new Cite(doc.label_bibtex).format('bibliography', {
        format: 'html',
        template: 'apa',
        lang: 'en-US'
    });
    return (
        <li>
            <div dangerouslySetInnerHTML={{ __html: apa }}></div>
            <a href={doc.uri_s} target='_blank'>[Open HAL page in a new tab]</a>
        </li>
    );
}
