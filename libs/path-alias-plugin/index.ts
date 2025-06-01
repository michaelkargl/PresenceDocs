import PackageJson from './package.json';
import {WebpackAliasBuilder} from "./src/webpack-alias-builder";
import {TsconfigProvider} from "./src/tsconfig-provider";
import {WebpackConfigurationBuilder} from "./src/webpack-configuration-builder";
import {PathAliasPluginOptions} from "./src/models";


/**
 * Returns a docusaurus plugin module that configures webpack to do processing of
 * path aliases. This is done by modifying the webpack configuration through the
 * `configureWebpack` function. Mind the links below for further reading.
 *
 * @see https://dwf.dev/blog/2022/11/12/2022/updating-docusaurus-webpack-config/
 * @see https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis#configureWebpack
 * @see https://webpack.js.org/configuration/resolve/#resolve
 */
export default async function (context: unknown, options: any) {
    console.log("Registering Plugin %s with version %s", PackageJson.name, PackageJson.version);
    console.log("Registering Plugin %s with options %s", PackageJson.name, JSON.stringify(options));

    const tsconfigProvider = new TsconfigProvider(options.tsconfigPath);
    const webpackAliasBuilder = new WebpackAliasBuilder(tsconfigProvider);
    const webpackConfigBuilder = new WebpackConfigurationBuilder();

    const webpackConfig = await webpackConfigBuilder
        .withAliases(await webpackAliasBuilder.buildAsync())
        .buildAsync();

    return {
        name: PackageJson.name,
        configureWebpack(config: unknown, isServer: unknown, utils: unknown) {
            return webpackConfig;
        }
    }
}