import * as React from "react";
import { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import { HALDocTypes, HALGroupFields, HALSortFields, queryBuilder } from "./hal";
import { HALDoc, HALDocTypesKeys, HALGroup, HALGroupFieldsKeys, HALProps, HALSortFieldsKeys, HALState } from "./types";

const Cite = require('citation-js');

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('div.wp-block-halb-hal-block').forEach(block => {
        ReactDOM.render(
            <HALBlock
                desc={block.getAttribute('desc') == 'true'}
                docTypes={block.getAttribute('docTypesStr').split(',') as HALDocTypesKeys[]}
                fq={block.getAttribute('fq')}
                groupField={block.getAttribute('groupField') as HALGroupFieldsKeys}
                groupLimit={block.getAttribute('groupLimit')}
                portColl={block.getAttribute('portColl')}
                q={block.getAttribute('q')}
                sortField={block.getAttribute('sortField') as HALSortFieldsKeys}
            />, block);
    });
});

function HALBlock(props: HALProps) {
    const [desc, setDesc] = useState(props.desc);
    const [groupField, setGroupField] = useState(props.groupField);
    const [sortField, setSortField] = useState(props.sortField);

    return (
        <>
            <HALHeader
                blockState={{ desc, groupField, sortField }}
                setGroup={setGroupField}
                setSort={setSortField}
                setDesc={setDesc}
            ></HALHeader>
            <HALDiv blockProps={props} blockState={{ desc, groupField, sortField }}></HALDiv>
        </>
    );
}

function HALHeader({ blockState, setGroup, setSort, setDesc }:
    { blockState: HALState, setGroup: Function, setSort: Function, setDesc: Function }) {
    return (
        <strong>
            <span>Sort by </span>
            <select
                value={blockState.sortField}
                onChange={event => setSort(event.target.value)}>
                {(() => {
                    let options: JSX.Element[] = [];
                    Object.entries(HALSortFields).forEach(([key, desc]) => {
                        options.push(<option value={key}>{desc.toLowerCase()}</option>);
                    });
                    return options;
                })()}
            </select>
            <select value={blockState.desc ? 'desc' : 'asc'} onChange={event => setDesc(event.target.value == 'desc')}>
                <option value='desc'>↓</option>
                <option value='asc'>↑</option>
            </select>
            <span> and group by </span>
            <select
                value={blockState.groupField}
                onChange={event => setGroup(event.target.value)}>
                {(() => {
                    let options: JSX.Element[] = [];
                    Object.entries(HALGroupFields).forEach(([key, desc]) => {
                        options.push(<option value={key}>{desc.toLowerCase()}</option>);
                    });
                    return options;
                })()}
            </select>
        </strong>
    );
}

function HALDiv(props: { blockProps: HALProps, blockState: HALState }) {
    const [groups, setGroups] = useState<HALGroup[]>([]);
    const [hasError, setHasError] = useState<boolean>(false);
    const docTypes = props.blockProps.docTypes;

    async function fetchGroups() {
        try {
            let url = queryBuilder({ ...props.blockProps, ...props.blockState });
            let response = await fetch(url);
            let json = await response.json();
            setGroups(json.grouped[Object.keys(json.grouped)[0]].groups);
        } catch (error) {
            console.log(error);
            setHasError(true);
        }
    }

    useEffect(() => { if (!hasError) fetchGroups(); }, [props])

    if (hasError) {
        return <p className='hal-error'>Something went wrong.</p >;
    }

    let halGroups: JSX.Element[] = [];
    groups.forEach(group => {
        if (/^\d+$/.test(group.groupValue) || docTypes.includes(group.groupValue as HALDocTypesKeys)) {
            halGroups.push(
                <HALGroup group={group} docTypes={docTypes}></HALGroup>
            );
        }
    });
    return (
        <>
            {halGroups}
        </>
    );
}

function HALGroup({ group, docTypes }: { group: HALGroup, docTypes: string[] }) {
    // Friendly name
    let groupName;
    if (docTypes.includes(group.groupValue as HALDocTypesKeys)) {
        groupName = HALDocTypes[group.groupValue as HALDocTypesKeys];
    } else {
        groupName = group.groupValue;
    }

    // Rows
    let rows: JSX.Element[] = [];
    group.doclist.docs.forEach(doc => {
        if (docTypes.includes(doc.docType_s)) {
            rows.push(<DocRow doc={doc}></DocRow>);
        }
    });

    // Keep group if there is at least one item
    if (rows.length == 0) {
        return <div></div>;
    }
    return (
        <div>
            <h3>{groupName}</h3>
            <ul>
                {rows}
            </ul>
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
