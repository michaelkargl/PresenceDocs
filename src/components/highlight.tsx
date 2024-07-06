import React, {FC} from "react"
import {MDXProvider} from '@mdx-js/react'
import {MDXComponents} from "@mdx-js/react/lib";

interface HighlightProps {
    children?: React.ReactNode;
    color: string;
}

const Highlight: FC<HighlightProps> = (props) => {
    console.log('Highlighting %s in %s', props.children, props.color);
    return (
        <span style={{
            backgroundColor: props.color,
            borderRadius: '3px',
            color: '#fff',
            padding: '0.2rem'
        }}>{props.children}</span>
    );
};

const components: MDXComponents = {Highlight};

// make the custom component available to the MDX engine
export default ({children, color}) => {

    return (
        <MDXProvider components={components}>
            <Highlight color={color}>{children}</Highlight>
        </MDXProvider>
    );
};