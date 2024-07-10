# Presence Docs

<div align="center">
    ![]("./static/img/logo.svg")

    This projet hosts documentation using  [Docusaurus], a modern static website generator.
</div>
<br/>
<hr/>
<br/>

## Reading the docs

```pwsh
npm run start
```

## Requirements

To run or extend the docs, you will have some tools installed. We recommend
checking out the CI pipeline for details on base setup and versions.

* [CI Pipeline](/.gitlab-ci.yml)
* VSCode
* Node
* NPM

See also:

* [Docusaurus Requirements]


## Technologies used

* **[Docusaurus]**: Platform for generating static websites from markdown pages
* **[react]**: A library for user interfaces
* **[mdx-js]**: Allows you to use JSX in your markdown content (`.mdx` pages)
* **[docusaurus-local-search]**: indexes content at compile time for local searching
* **[storybook]**: platform for documenting and testing web components

## Installation

After checkin out the repository, you'll need to install all the dependencies:
```console
npm install
```

## Local Development

```pwsh
# running the docusaurus instance
npm run start

# running storybook
npm run storbook
```

This command starts a local development server and open up a browser window. 
Most changes are reflected live without having to restart the server.

### Using MDX react components

Suffixing a file with the `.mdx` turns it into a JSX enabled page. One effectively writes markdown through JSX which enables the use of react features.

```mdx
import {Chart} from './snowfall.js'
export const year = 2018

# Snowfall in {year}

<Chart year={year} color="#fcb32c" />
```


## Build

```console
npm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

The page is deployed using [Gitlab CI] so no manual intervention is necessary for the actual deployment process. To enable docusaurus to find static resources like styling or images, `url` and `baseUrl` have to be set to point at addresses and paths of the to-be-deployed system.

**Example: The page is hosted in gitlab pages at https://ohsnaparts.gitlab.io/osasoftworks/zube/presence-docs/docs/presence-ui/**

```json
{
    //...
    // base url of the web server
    "url": "https://ohsnaparts.gitlab.io/",
    // path pointing to the page hosted at `url`
    "baseUrl": "/osasoftworks/zube/presence-docs/",
    //...
}
```

> `/docs/presence-ui/` are just 2 nested markdown pages

## Updating the application

See the [Docusaurus Docs][Docusaurus Updating] on how to update the application. This is done in mainly a handful of steps:

1. Find the version to update to using npm: [@docusaurus/core]
1. Adjust the rest of the `@docusaurus` packages in `package.json` to reflect that version
1. For third party dependencies, update major versions only if `docusaurus` updates theirs to ensure API compatibility (see [Semver])
1. `npm install`
1. Done

[Docusaurus Updating]: https://docusaurus.io/docs/installation#updating-your-docusaurus-version
[Gitlab CI]: ./.gitlab-ci.yml
[Docusaurus]: https://v2.docusaurus.io/
[@docusaurus/core]: https://www.npmjs.com/package/@docusaurus/core?activeTab=versions
[Semver]: https://semver.org/#summary
[React]: https://react.dev/
[mdxjs]: https://mdxjs.com/
[docusaurus-local-search]: https://docusaurus.io/docs/search#using-local-search
[Docusaurus Requirements]: https://docusaurus.io/docs/installation#requirements
[docusaurus-markdown-react-features]: https://docusaurus.io/docs/markdown-features/react
[storybook]: https://storybook.js.org/