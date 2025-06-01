"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A Jest transformer with source map support that lets you use Jest to test projects written in TypeScript.
 *
 * @see https://jestjs.io/docs/getting-started#via-ts-jest
 * @see https://github.com/kulshekhar/ts-jest
 */
exports.default = {
    preset: 'ts-jest',
    testEnvironment: "node",
    transform: {
        "^.+.tsx?$": ["ts-jest", {}],
    },
};
