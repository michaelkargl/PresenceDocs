"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpackConfigurationBuilder = void 0;
class WebpackConfigurationBuilder {
    aliases = {};
    withAliases(aliases) {
        this.aliases = aliases;
        return this;
    }
    async buildAsync() {
        return WebpackConfigurationBuilder.setAliases({}, this.aliases);
    }
    // These aliases tell webpack to replace path aliases with the configured directory paths
    static setAliases(configuration, aliases) {
        const newConfig = { ...configuration };
        newConfig.resolve ??= { alias: {} };
        newConfig.resolve.alias = {};
        console.info("Registering path aliases: %o", aliases);
        Object.assign(newConfig.resolve.alias, { ...aliases });
        return newConfig;
    }
}
exports.WebpackConfigurationBuilder = WebpackConfigurationBuilder;
