import React from 'react';
import Heading from '@theme-original/MDXComponents/Heading';
import type HeadingType from '@theme/MDXComponents/Heading';
import type {WrapperProps} from '@docusaurus/types';
import CanvasBanner from "@components/canvas-banner";

type Props = WrapperProps<typeof HeadingType>;

const headlineEmSizes = new Map<string, number>([
    ["h1", 2.00],
    ["h2", 1.50],
    ["h3", 1.17],
    ["h4", 1.00],
    ["h5", 0.83],
    ["h6", 0.67],
]);

export default function HeadingWrapper(props: Props): JSX.Element {
    // add a padding the size of the font (50% top, 50% bottom)
    const padding = headlineEmSizes.get(props.as);
    return (
        <CanvasBanner padding={padding}>
            <Heading {...props} />
        </CanvasBanner>
    );
}

