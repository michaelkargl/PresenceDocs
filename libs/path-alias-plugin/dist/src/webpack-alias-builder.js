"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpackAliasBuilder = void 0;
const path_1 = __importDefault(require("path"));
class WebpackAliasBuilder {
    tsconfigProvider;
    constructor(tsconfigProvider) {
        this.tsconfigProvider = tsconfigProvider;
    }
    async buildAsync() {
        const aliases = await this.convertTsconfigPathMappingsToWebpackAliasesAsync(this.tsconfigProvider);
        return aliases;
    }
    async convertTsconfigPathMappingsToWebpackAliasesAsync(tsconfigProvider) {
        const aliases = {};
        const tsconfig = await tsconfigProvider.provideAsync();
        console.debug("Extracting path aliases from tsconfig: %s", tsconfigProvider.tsconfigPath.fullName);
        // webpack only needs the base paths without the globs
        // { "@app/*": ["./src/*"] } => { "@app": ["./src"] }
        const pathEntries = Object.entries(tsconfig?.compilerOptions?.paths ?? {});
        pathEntries
            .filter(e => this.filterInvalidPathEntry(e))
            .forEach(([alias, paths]) => {
            const webpackAlias = alias.replace(/\/\*$/, '');
            const webpackPaths = paths.map(p => {
                const globlessPath = p.replace(/\/?\*$/, '');
                const isRelativePath = !path_1.default.isAbsolute(globlessPath);
                const absolutePath = isRelativePath
                    ? path_1.default.resolve(tsconfigProvider.tsconfigPath.directoryPath, globlessPath)
                    : globlessPath;
                console.debug("Resolved [%s] path %s => %s", isRelativePath ? 'relative' : 'absolute', p, absolutePath);
                return absolutePath;
            });
            Object.assign(aliases, { [webpackAlias]: webpackPaths });
        });
        return aliases;
    }
    filterInvalidPathEntry(entry) {
        return this.validatePathEntryPaths(entry) || this.validatePathEntryAlias(entry);
    }
    validatePathEntryPaths(entry) {
        const [alias, paths] = entry;
        let validPath = !!paths && paths.length > 0;
        if (validPath) {
            return true;
        }
        console.warn("Ignoring alias [%s]: it has no path mappings", alias);
        return false;
    }
    validatePathEntryAlias(entry) {
        const [alias, paths] = entry;
        if (!alias) {
            console.warn("Ignoring alias [%s]: it is empty", alias);
            return false;
        }
        const aliasPattern = /^[a-zA-Z0-9_-]+$/;
        if (!aliasPattern.test(alias)) {
            console.warn("Ignoring alias [%s]: it does not follow the pattern [%s]", alias, aliasPattern.source);
            return false;
        }
        return true;
    }
}
exports.WebpackAliasBuilder = WebpackAliasBuilder;
