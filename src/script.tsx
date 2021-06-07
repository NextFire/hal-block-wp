import * as React from "react";
import * as ReactDOM from "react-dom";
import { HALResponse } from "./types";

window.onload = () => {
    document.querySelectorAll('div.wp-block-halb-hal-block').forEach(async block => {
        try {
            let response = await fetch(block.getAttribute('url'));
            let data = await response.json();
            ReactDOM.render(<HALArray docs={data.response.docs} />, block);
        } catch (error) {
            ReactDOM.render(
                <p className='hal-error'>
                    An error occured when fetching <br />
                    {block.getAttribute('url')}
                    <br /><br />
                    {error}
                </p >, block);
        }
    });
}

function HALArray({ docs }: { docs: HALResponse[] }) {
    let rows = [];
    for (const doc of docs) {
        rows.push(<DocRow doc={doc}></DocRow>)
    }
    return (
        <ul>
            {rows}
        </ul>
    );
}

function DocRow({ doc }: { doc: HALResponse }) {
    return (
        <li >
            <a href={doc.uri_s}>
                {doc.label_s}
            </a>
        </li>
    );
}
