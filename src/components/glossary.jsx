import { MDXProvider } from '@mdx-js/react';
import React from 'react';

/**
 * @returns the glossary table header
 */
function generateTableHead() {
    return (<thead>
        <th>Term</th>
        <th>Description</th>
    </thead>);
}

/**
 * @param {Map<string, string>} terms
 * @returns the glossary table body
 */
function generateGlossaryBody(terms) {
    return (<tbody>{ 
        Object.entries(terms).map(([term, definition]) => 
            <GlossaryEntry term={term} definition={definition} />
        )
    }</tbody>);
}


/**
 * Generates a glossary entry
 * @param {string} term
 * @param {string} definition
 */
const GlossaryEntry = props => {
    const { term, definition } = props;
    return (<tr>
        <td>{term}</td>
        <td>{definition}</td>
    </tr>);
};

/**
 * Generates a glossary from a list of terms
 * @param {Map<string, string>} terms
 */
export const Glossary = props => {
    const { terms } = props;
    return (<table>
        { generateTableHead() }
        { generateGlossaryBody(terms) }
    </table>);
};

