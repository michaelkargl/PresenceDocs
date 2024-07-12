import {describe, expect, it} from '@jest/globals';
import {WebpackAliasBuilder} from "./webpack-alias-builder";
import path from 'path';
import {TsconfigProvider} from "./tsconfig-provider";

describe('WebpackAliasBuilder', () => {

    const tsconfigPath = path.resolve(__dirname, 'testing/test-tsconfig.json');
    const tsconfigProvider = new TsconfigProvider(tsconfigPath);

    describe('build', () => {

        it('extracts path aliases from tsconfig', async () => {
            const aliases = await new WebpackAliasBuilder(tsconfigProvider).buildAsync()
            const tsconfigDirPath = tsconfigProvider.tsconfigPath.directoryPath;

            expect(aliases).toEqual({
                "@AAA": [path.resolve(tsconfigDirPath, "./AAA")],
                "@BBB": [path.resolve(tsconfigDirPath, "./BBB/src"), path.resolve(tsconfigDirPath, "./BBB/components")]
            });
        });

    });
});