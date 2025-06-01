"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const package_json_1 = __importDefault(require("./package.json"));
const webpack_alias_builder_1 = require("./src/webpack-alias-builder");
const tsconfig_provider_1 = require("./src/tsconfig-provider");
const webpack_configuration_builder_1 = require("./src/webpack-configuration-builder");
/**
 * Returns a docusaurus plugin module that configures webpack to do processing of
 * path aliases. This is done by modifying the webpack configuration through the
 * `configureWebpack` function. Mind the links below for further reading.
 *
 * @see https://dwf.dev/blog/2022/11/12/2022/updating-docusaurus-webpack-config/
 * @see https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis#configureWebpack
 * @see https://webpack.js.org/configuration/resolve/#resolve
 */
async function default_1(context, options) {
    console.log("Registering Plugin %s with version %s", package_json_1.default.name, package_json_1.default.version);
    console.log("Registering Plugin %s with options %s", package_json_1.default.name, JSON.stringify(options));
    const tsconfigProvider = new tsconfig_provider_1.TsconfigProvider(options.tsconfigPath);
    const webpackAliasBuilder = new webpack_alias_builder_1.WebpackAliasBuilder(tsconfigProvider);
    const webpackConfigBuilder = new webpack_configuration_builder_1.WebpackConfigurationBuilder();
    const webpackConfig = await webpackConfigBuilder
        .withAliases(await webpackAliasBuilder.buildAsync())
        .buildAsync();
    return {
        name: package_json_1.default.name,
        configureWebpack(config, isServer, utils) {
            return webpackConfig;
        }
    };
}
