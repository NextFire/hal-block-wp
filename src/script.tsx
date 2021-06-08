import * as React from "react";
import * as ReactDOM from "react-dom";
import { HALResponse } from "./types";

document.addEventListener('DOMContentLoaded', () => {
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
});

function HALArray({ docs }: { docs: HALResponse[] }) {
    let rows: JSX.Element[] = [];
    docs.forEach(doc => rows.push(<DocRow doc={doc}></DocRow>))
    return (
        <table>
            <tr>
                <th>Title</th>
            </tr>
            {rows}
        </table>
    );
}

function DocRow({ doc }: { doc: HALResponse }) {
    return (
        <tr>
            <td>
                <a href={doc.uri_s}>
                    {doc.label_s}
                </a>
            </td>
        </tr>
    );
}
