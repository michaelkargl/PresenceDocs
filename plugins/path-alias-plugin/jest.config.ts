import TsJestConfig from './ts-jest.config';
import { defaults } from 'jest-config';
import { Config } from 'jest';

module.exports = <Config>{
    // force the config to be based on the official jest defaults
    ...defaults,

    // --- --- --- --- --- --- --- --- ---
    // Mind the overrides at the bottom
    // --- --- --- --- --- --- --- --- ---

    collectCoverage: true,
    coverageReporters: ['lcov', 'text-summary'],
    coverageDirectory: '.coverage',

    ...TsJestConfig
};