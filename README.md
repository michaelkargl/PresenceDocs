# Presence Docs

<div align="center">
    ![]("./static/img/logo.svg")

    This website is using Docusaurus, a modern static website generator.
</div>
<br/>
<hr/>
<br/>

## Reading the docs

There are 3 ways of consuming these docs

1. Run the full docusaurus instance and browse them using the web-interface
1. Export the docs to PDF
1. [Browse the Markdown files manually](./docs)


## Requirements

To run or extend the docs, you will have some tools installed. We recommend
checking out the CI pipeline for details on base setup and versions.

* [CI Pipeline](/.gitlab-ci.yml)
* VSCode
* Node
* NPM

See also:

* [Docusaurus Requirements]

[Docusaurus Requirements]: https://docusaurus.io/docs/installation#requirements


## Installation

After checkin out the repository, you'll need to install all the dependencies:
```console
npm install
```

## Local Development

```console
npm start
```

This command starts a local development server and open up a browser window. 
Most changes are reflected live without having to restart the server.

## Build

```console
npm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

The page is deployed using [Gitlab CI].\
No manual intervention is necessary.


## PDF Export

You can export the documentation as PDF by running the instance
```console
npm start
```
and issue
```console
npm run build-pdf
```
within a separate window.


## Updating the application

See the [Docusaurus Docs][Docusaurus Updating] on how to update the application. This is done in mainly a handful of steps:

1. Find the version to update to using npm: [@docusaurus/core]
1. Adjust the rest of the `@docusaurus` packages in `package.json` to reflect that version
1. For third party dependencies, update major versions only if `docusaurus` updates theirs to ensure API compatibility (see [Semver])
1. `npm install`
1. Done

[Docusaurus Updating]: https://docusaurus.io/docs/installation#updating-your-docusaurus-version
[Gitlab CI]: ./.gitlab-ci.yml
[Docusaurus 2]: https://v2.docusaurus.io/
[@docusaurus/core]: https://www.npmjs.com/package/@docusaurus/core?activeTab=versions
[Semver]: https://semver.org/#summary