"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("node:path"));
var package_json_1 = __importDefault(require("./package.json"));
function provideAliases(projectRootPath) {
    var srcFolder = path.resolve(projectRootPath, 'src/');
    return {
        '@app': srcFolder,
        '@components': path.resolve(srcFolder, 'components/')
    };
}
/**
 * Appends the given aliases to the specified webpack config by mutation
 */
function configureAliases(webpackConfig, aliases) {
    // These configuration changes tell webpack to replace path aliases with the configured directory paths
    // Mind that the linter doesn't knows about these replacements => add them in tsconfig too
    Object.assign(webpackConfig.resolve.alias, aliases);
    return __assign({}, webpackConfig);
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
exports.default = (function (context, options) {
    console.warn(JSON.stringify(options));
    return {
        name: package_json_1.default.name,
        configureWebpack: function (config, isServer, utils) {
            var pluginFolder = path.resolve(__dirname);
            var projectRoot = path.resolve(pluginFolder, '../../');
            var aliases = provideAliases(projectRoot);
            var configurationDelta = { resolve: { alias: {} } };
            return configureAliases(configurationDelta, aliases);
        }
    };
});
