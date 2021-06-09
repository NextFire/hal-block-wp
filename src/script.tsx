import * as React from "react";
import * as ReactDOM from "react-dom";
import { HALResponse } from "./types";
const Cite = require('citation-js');

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('div.wp-block-halb-hal-block').forEach(async block => {
        try {
            let response = await fetch(block.getAttribute('url'));
            let data = await response.json();
            ReactDOM.render(<HALList docs={data.response.docs} />, block);
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

function HALList({ docs }: { docs: HALResponse[] }) {
    let rows: JSX.Element[] = [];
    docs.forEach(doc => rows.push(<DocRow doc={doc}></DocRow>));
    return (
        <ul>
            {rows}
        </ul>
    );
}

function DocRow({ doc }: { doc: HALResponse }) {
    let cite = new Cite(doc.label_bibtex);
    let apa = cite.format('bibliography', {
        format: 'html',
        template: 'apa',
        lang: 'en-US'
    });
    return (
        <li>
            <div dangerouslySetInnerHTML={{ __html: apa }}></div>
            <a href={doc.uri_s} target='_blank'>[Open in a new tab]</a>
        </li>
    );
}
