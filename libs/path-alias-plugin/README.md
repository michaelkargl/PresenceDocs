# Path Alias Plugin

Adds path alias support to docusaurus

Docusaurus, by default only supports its own path aliases that
point to the root project. Since we are making use of path aliases
in other parts of the application (for instance mdx files or storybook stories), we have to do some work to add these
to docusaurus.

## Dependencies

- nvm ([bash][nvm-linux] / [pwsh][nvm-pwsh])

```pwsh
nvm install
nvm use
```

[nvm-linux]: https://github.com/nvm-sh/nvm
[nvm-pwsh]: https://github.com/aaronpowell/ps-nvm

## Building

The plugin is written in typescript, so we need to transpile the
module before it can be referenced:

```pwsh
# bundles the package into a file usable as dev dependency
yarn run build
```

## Usage

To use the plugin copy the dist folder into your project and link it in your [`package.json`][demo-package.json]:

```jsonc
{
  // ...
  // add the plugin as local package to your dev dependencies
  "devDependencies": {
    "path-alias-plugin": "file:./libs/path-alias-plugin/dist"
  }
  // ...
}
```

Refresh your dependencies

```pwsh
yarn install
```

And add it to your [`demo-docusaurus.config.ts`][demo-docusaurus.config.ts]:

```ts
export default <Config>{
  // ...
  // point the plugin to your tsconfig file containing the path aliases
  plugins: [
    [
      "path-alias-plugin",
      <PathAliasPluginOptions>{
        tsconfigPath: path.resolve(ROOT_DIR, "tsconfig.json"),
      },
    ],
  ],
  //...
};
```

Done. From here on out, your path aliases configured in [`tsconfig.json`][demo-tsconfig.json]:

```json
{
  "extends": "@docusaurus/tsconfig",
  "compilerOptions": {
    // ...
    // configure your path aliases
    "paths": {
      "@components/*": ["./src/components/*"]
    }
  }
}
```

are also regarded in [your docusaurus pages][demo-docusaurus.config.ts]:

```md
---
id: page-x
slug: /
title: Page X
---

<!-- ... -->

<!-- Use your path aliases in your mdx files -->

import CanvasBanner from "@components/canvas-banner.tsx";
```

[demo-tsconfig.json]: https://github.com/michaelkargl/PresenceDocs/blob/5e65576ba5e61ca1aab9738df7ceb1c5f1bd4b13/tsconfig.json#L10
[demo-docusaurus.config.ts]: https://github.com/michaelkargl/PresenceDocs/blob/5e65576ba5e61ca1aab9738df7ceb1c5f1bd4b13/docusaurus.config.ts#L125
[demo-package.json]: https://github.com/michaelkargl/PresenceDocs/blob/5e65576ba5e61ca1aab9738df7ceb1c5f1bd4b13/package.json#L46

## Resources

- <https://dwf.dev/blog/2022/11/12/2022/updating-docusaurus-webpack-config/>
- <https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis#configureWebpack>
- <https://webpack.js.org/configuration/resolve/#resolve>
