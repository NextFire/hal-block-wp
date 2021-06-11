import * as React from "react";
import * as ReactDOM from "react-dom";
import { halDocTypes, halGroupFields, halSortFields, queryBuilder } from "./hal";
import { HALDoc, HALGroup, HALProps, HALState } from "./types";
const Cite = require('citation-js');

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('div.wp-block-halb-hal-block').forEach(block => {
        ReactDOM.render(
            <HALBlock
                desc={block.getAttribute('desc') == 'desc'}
                docTypes={block.getAttribute('docTypesStr').split(',')}
                fq={block.getAttribute('fq')}
                groupField={block.getAttribute('groupField')}
                groupLimit={block.getAttribute('groupLimit')}
                portColl={block.getAttribute('portColl')}
                q={block.getAttribute('q')}
                sortField={block.getAttribute('sortField')}
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
            <div>
                <HALHeader
                    blockState={this.state}
                    setGroup={(value: string) => this.setState({ groupField: value })}
                    setSort={(value: string) => this.setState({ sortField: value })}
                    setDesc={(value: boolean) => this.setState({ desc: value })}
                ></HALHeader>
                <HALDiv blockProps={this.props} blockState={this.state}></HALDiv>
            </div>
        );
    }

}

function HALHeader({ blockState: parentState, setGroup, setSort, setDesc }:
    { blockState: HALState, setGroup: Function, setSort: Function, setDesc: Function }) {
    return (
        <strong>
            [Grouped by
            <select value={parentState.groupField} onChange={event => setGroup(event.target.value)}>
                {(() => {
                    let options: JSX.Element[] = [];
                    Object.entries(halGroupFields).forEach(([key, desc]: [string, string]) => {
                        options.push(<option value={key}>{desc.toLowerCase()}</option>);
                    });
                    return options;
                })()}
            </select>
            then sorted by
            <select value={parentState.sortField} onChange={event => setSort(event.target.value)}>
                {(() => {
                    let options: JSX.Element[] = [];
                    Object.entries(halSortFields).forEach(([key, desc]: [string, string]) => {
                        options.push(<option value={key}>{desc.toLowerCase()}</option>);
                    });
                    return options;
                })()}
            </select>
            <select value={parentState.desc ? 'desc' : 'asc'} onChange={event => setDesc(event.target.value == 'desc')}>
                <option value='desc'>↓</option>
                <option value='asc'>↑</option>
            </select>
        </strong>
    );
}

class HALDiv extends React.Component<{ blockProps: HALProps, blockState: HALState }, { groups: HALGroup[] }> {

    constructor(props: { blockProps: HALProps, blockState: HALState }) {
        super(props);
        this.state = { groups: [] };
    }

    async fetchGroups() {
        let url = queryBuilder({ ...this.props.blockProps, ...this.props.blockState })
        try {
            let response = await fetch(url);
            let json = await response.json();
            this.setState({ groups: json.grouped[Object.keys(json.grouped)[0]].groups });
        } catch (error) {
            console.log(error);
            this.setState({ groups: [] });
        }
    }

    async componentDidMount() {
        await this.fetchGroups();
    }

    async componentDidUpdate() {
        await this.fetchGroups();
    }

    render() {
        let halGroups: JSX.Element[] = [];
        let docTypes = this.props.blockProps.docTypes;
        this.state.groups.forEach(group => {
            if (/^\d+$/.test(group.groupValue) || docTypes.includes(group.groupValue)) {
                halGroups.push(
                    <HALGroup group={group} docTypes={docTypes}></HALGroup>
                );
            }
        })
        return halGroups;
    }

}

function HALGroup({ group, docTypes }: { group: HALGroup, docTypes: string[] }) {
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
        return (
            <div>
                <h2>{groupName}</h2>
                <ul>
                    {rows}
                </ul>
            </div>
        );
    } else {
        return <div></div>;
    }
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
