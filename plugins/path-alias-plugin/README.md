# Path Alias Plugin

Adds path alias support to docusaurus

## Description

> In short: We created a `plugins` folder that contains a private
> npm package (registered in `package.json`) that defines
> a docusaurus plugin for adding type alias support through webpack.


Docusaurus, by default only supports its own path aliases that
point to the root project. Since we are making use of path aliases
in storybook components, we have to be able to ensure that these
are also supported in docusaurus.

Storybook uses a webpack configuration to add path alias support.
Luckily, docusaurus provides the means to extend the webpack
configuration via docusaurus plugins to do the same.

## How to use

### Dependencies

* nvm ([bash][nvm-linux] / [pwsh][nvm-pwsh])

```pwsh
nvm install
nvm use
```

[nvm-linux]: https://github.com/nvm-sh/nvm

[nvm-pwsh]: https://github.com/aaronpowell/ps-nvm

### 1. Build

The plugin is written in typescript, so we need to transpile the
module before it can be referenced:

```
npm run build
```

### 2. Register in package.json

```
// package.json
devDependencies: {
  "path-alias-plugin": "file:plugins/path-alias-plugin"
}
```

### 3. Register with docusaurus

```
// docusaurus.config.ts
plugins: [
    [ 'path-alias-plugin', { fancy: true } ]
],
```

### 4. Run

```pwsh
npm install
npm run start
```

## Resources

* https://dwf.dev/blog/2022/11/12/2022/updating-docusaurus-webpack-config/
* https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis#configureWebpack
* https://webpack.js.org/configuration/resolve/#resolve

