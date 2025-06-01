import {JestConfigWithTsJest} from "ts-jest";

/**
 * A Jest transformer with source map support that lets you use Jest to test projects written in TypeScript.
 *
 * @see https://jestjs.io/docs/getting-started#via-ts-jest
 * @see https://github.com/kulshekhar/ts-jest
 */
export default <JestConfigWithTsJest>{
    preset: 'ts-jest',
    testEnvironment: "node",
    transform: {
        "^.+.tsx?$": ["ts-jest", {}],
    },
};
