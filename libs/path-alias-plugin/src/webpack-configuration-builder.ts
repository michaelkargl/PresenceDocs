import {Aliases} from "./models";
import {Configuration} from "webpack";


export class WebpackConfigurationBuilder {
    private aliases: Aliases = {};

    public withAliases(aliases: Aliases): WebpackConfigurationBuilder {
        this.aliases = aliases;
        return this;
    }

    public async buildAsync(): Promise<Configuration> {
        return WebpackConfigurationBuilder.setAliases(<Configuration>{}, this.aliases);
    }

    // These aliases tell webpack to replace path aliases with the configured directory paths
    private static setAliases(
        configuration: Readonly<Configuration>,
        aliases: Readonly<Aliases>
    ): Configuration {
        const newConfig: Configuration = {...configuration};
        newConfig.resolve ??= {alias: {}};
        newConfig.resolve.alias = {};

        console.info("Registering path aliases: %o", aliases);
        Object.assign(newConfig.resolve.alias, {...aliases});

        return newConfig;
    }
}