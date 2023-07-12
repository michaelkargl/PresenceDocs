# Docs

This folder contains markdown files with header descriptors that help docusaurus to build its web-presentation.
See the [Docs Introduction](https://v2.docusaurus.io/docs/docs-introduction) for details.

As docusaurus only uses markdown, they are consumable without special tools.
So, unless the page creates content using plugins or through javascript code, the pages will be available without having the need to install special tooling.

## Adding Pages

Docusaurus scans for markdown files and registers routes according to their header descriptors


> docs/page.mdx
> ```txt
> ---
> id: presence-docs
> slug: /presence-docs
> title: Presence Docs
> ---
> 
> # Page
> 
> Content
> ```

This registers a page at the route `/docs/presence-docs`.
Unless your register that page with the [sidebar], you
will have to link it within your markup directly.

[sidebar]: /sidebars.js