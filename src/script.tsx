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
                    An error occured when fetching<br />
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
            <thead>
                <tr>
                    <th className='authors'>Authors</th>
                    <th className='title'>Title</th>
                    <th className='dateLink'>Submitted date</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}

function DocRow({ doc }: { doc: HALResponse }) {
    return (
        <tr>
            <td>
                {doc.authFullName_s.join(', ')}
            </td>
            <td>
                <a href={doc.uri_s} target='_blank'>{doc.title_s[0]}</a>
            </td>
            <td>
                {doc.submittedDate_tdate.slice(0, 10)} <br />
            </td>
        </tr>
    );
}
