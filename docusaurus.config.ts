import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import path from "node:path";
import {PathAliasPluginOptions} from "path-alias-plugin/src/models/path-alias-plugin-options";

type Stylesheet = {
    href: string;
    [key: string]: string | boolean | undefined;
};

const ROOT_DIR = __dirname;

const katexStylesheet: Stylesheet = {
    href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
    type: 'text/css',
    integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
    crossorigin: 'anonymous',
};

export default <Config>{
    title: 'Presence Docs',
    tagline: 'Presence System Documentation',
    // these paths need to reflect your production URLs
    url: 'https://ohsnaparts.gitlab.io/',
    baseUrl: '/osasoftworks/zube/presence-docs/',
    onBrokenLinks: 'throw',
    favicon: 'img/favicon.ico',
    organizationName: 'ohsnaparts',  // Usually your GitHub org/user name.
    projectName: 'presence-docs',    // Usually your repo name.
    themeConfig: {
        navbar: {
            title: 'My Site',
            logo: {
                alt: 'My Site Logo',
                src: 'img/logo.svg',
            },
            items: [
                {
                    to: 'docs/',
                    activeBasePath: 'docs',
                    label: 'Docs',
                    position: 'left',
                },
                {to: 'blog', label: 'Blog', position: 'left'},
                {
                    href: 'https://github.com/facebook/docusaurus',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Docs',
                    items: [
                        {
                            label: 'Style Guide',
                            to: '/docs/styleguide',
                        },
                    ],
                },
                {
                    title: 'Community',
                    items: [
                        {
                            label: 'Stack Overflow',
                            href: 'https://stackoverflow.com/questions/tagged/docusaurus',
                        },
                        {
                            label: 'Discord',
                            href: 'https://discordapp.com/invite/docusaurus',
                        },
                        {
                            label: 'Twitter',
                            href: 'https://twitter.com/docusaurus',
                        },
                    ],
                },
                {
                    title: 'More',
                    items: [
                        {
                            label: 'Blog',
                            to: 'blog',
                        },
                        {
                            label: 'GitHub',
                            href: 'https://github.com/facebook/docusaurus',
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} OhSnapArts.`,
        },
    },
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    editUrl:
                        'https://github.com/facebook/docusaurus/edit/master/website/',
                    rehypePlugins: [rehypeKatex],
                    remarkPlugins: [remarkMath]
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    editUrl:
                        'https://github.com/facebook/docusaurus/edit/master/website/blog/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            } satisfies Preset.Options,
        ],
    ],
    plugins: [
        ['path-alias-plugin', <PathAliasPluginOptions>{
            tsconfigPath: path.resolve(ROOT_DIR, 'tsconfig.json')
        }]
    ],
    markdown: {
        mermaid: true,
    }
    ,
    themes: [
        '@docusaurus/theme-mermaid'
    ],
    stylesheets:
        <Stylesheet[]>[
            katexStylesheet,
        ],
};
