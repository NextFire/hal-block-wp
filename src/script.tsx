import * as React from "react";
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

class HALBlock extends React.Component<HALProps, HALState>  {

    constructor(props: HALProps) {
        super(props);
        this.state = {
            desc: props.desc,
            groupField: props.groupField,
            sortField: props.sortField,
        }
    }

    render() {
        return (
            <>
                <HALHeader
                    blockState={this.state}
                    setGroup={(value: HALGroupFieldsKeys) => this.setState({ groupField: value })}
                    setSort={(value: HALSortFieldsKeys) => this.setState({ sortField: value })}
                    setDesc={(value: boolean) => this.setState({ desc: value })}
                ></HALHeader>
                <HALDiv blockProps={this.props} blockState={this.state}></HALDiv>
            </>
        );
    }

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

class HALDiv extends React.Component<{ blockProps: HALProps, blockState: HALState },
    { groups: HALGroup[], hasError: boolean }> {

    docTypes: HALDocTypesKeys[];

    constructor(props: { blockProps: HALProps, blockState: HALState }) {
        super(props);
        this.state = { groups: [], hasError: false };
        this.docTypes = this.props.blockProps.docTypes;
    }

    async fetchGroups() {
        try {
            let url = queryBuilder({ ...this.props.blockProps, ...this.props.blockState });
            let response = await fetch(url);
            let json = await response.json();
            this.setState({ groups: json.grouped[Object.keys(json.grouped)[0]].groups });
        } catch (error) {
            console.log(error);
            this.setState({ hasError: true });
        }
    }

    async componentDidMount() {
        await this.fetchGroups();
    }

    async componentDidUpdate(prevProps: { blockProps: HALProps, blockState: HALState }) {
        if (this.props != prevProps && !this.state.hasError) {
            await this.fetchGroups();
        }
    }

    render() {
        if (this.state.hasError) return <p className='hal-error'>Something went wrong.</p >;
        let halGroups: JSX.Element[] = [];
        this.state.groups.forEach(group => {
            if (/^\d+$/.test(group.groupValue) || this.docTypes.includes(group.groupValue as HALDocTypesKeys)) {
                halGroups.push(
                    <HALGroup group={group} docTypes={this.docTypes}></HALGroup>
                );
            }
        });
        return halGroups;
    }

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
