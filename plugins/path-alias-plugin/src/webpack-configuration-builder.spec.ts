import {describe, expect, it} from '@jest/globals';
import {WebpackConfigurationBuilder} from "./webpack-configuration-builder";
import {Aliases} from "./models";

describe('WebpackConfigurationBuilder', () => {
    describe('buildAsync', () => {
        it('aliases are applied to the webpack config', async () => {
            const expectedAliases: Aliases = {
                "@AAA": ["/tmp/AAA/src"],
                "@BBB": ["/tmp/BBB/src", "/tmp/BBB/src/components"]
            };

            const config = await new WebpackConfigurationBuilder()
                .withAliases(expectedAliases)
                .buildAsync();

            expect(config?.resolve?.alias).toBeDefined();
            expect(config!.resolve!.alias).toEqual(expectedAliases);
        })
    });
});