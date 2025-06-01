import {MDXProvider} from '@mdx-js/react';
import React from 'react';


const TableHead: React.FC = () => (
    <thead>
    <th>Term</th>
    <th>Description</th>
    </thead>
);


interface GlossaryBodyProps {
    terms: Map<string, string>;
}

const GlossaryBody: React.FC<GlossaryBodyProps> = (props) => (
    <tbody>{
        Object.entries(props.terms).map(([term, definition]) =>
            <GlossaryEntry term={term} definition={definition}/>
        )
    }</tbody>
);

interface GlossaryEntryProps {
    term: string;
    definition: string;
}

const GlossaryEntry: React.FC<GlossaryEntryProps> = props => {
    const {term, definition} = props;
    return (<tr id={term}>
        <td><a href={`#${term}`}>{term}</a></td>
        <td>{definition}</td>
    </tr>);
};


interface GlossaryProps {
    terms: Map<string, string>;
}

/**
 * @summary Generates a glossary from a list of terms
 */
export const Glossary: React.FC<GlossaryProps> = props => (
    <table>
        <TableHead />
        <GlossaryBody terms={props.terms} />
    </table>
);
