import {Configuration} from 'webpack';
import {LoadContext, Plugin, PluginModule} from "@docusaurus/types";
import PackageJson from './package.json';
import {Aliases} from "./aliases";
import {PathAliasPluginOptions} from "./path-alias-plugin-options";

/**
 * Appends the given aliases to the specified webpack config by mutation
 */
function configureAliases(webpackConfig: Configuration, aliases: Aliases): Configuration {
    // These configuration changes tell webpack to replace path aliases with the configured directory paths
    // Mind that the linter doesn't knows about these replacements => add them in tsconfig too
    Object.assign(webpackConfig.resolve.alias, aliases);
    return {...webpackConfig};
}

/**
 * Returns a docusaurus plugin module that configures webpack to do processing of
 * path aliases. This is done by modifying the webpack configuration through the
 * `configureWebpack` function. Mind the links below for further reading.
 *
 * @see https://dwf.dev/blog/2022/11/12/2022/updating-docusaurus-webpack-config/
 * @see https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis#configureWebpack
 * @see https://webpack.js.org/configuration/resolve/#resolve
 */
export default <PluginModule>function (context: LoadContext, options: PathAliasPluginOptions) {
    console.log("Registering Plugin %s with version %s", PackageJson.name, PackageJson.version);
    console.log("Registering Plugin %s with options %s", PackageJson.name, JSON.stringify(options));

    return <Plugin<unknown>>{
        name: PackageJson.name,
        configureWebpack(config, isServer, utils) {
            const configurationDelta: Configuration = {resolve: {alias: {}}};
            return configureAliases(configurationDelta, options.aliases)
        }
    }
}