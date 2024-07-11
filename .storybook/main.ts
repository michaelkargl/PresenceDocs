import type {StorybookConfig} from "@storybook/react-webpack5";
import * as path from "node:path";

const config: StorybookConfig = {
    stories: [
        "../src/**/*.mdx",
        "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
    ],
    addons: [
        "@storybook/addon-webpack5-compiler-swc",
        "@storybook/addon-onboarding",
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@chromatic-com/storybook",
        "@storybook/addon-interactions",
    ],
    framework: {
        name: "@storybook/react-webpack5",
        options: {},
    },
    swc: () => ({
        jsc: {
            transform: {
                react: {
                    runtime: 'automatic'
                }
            }
        }
    }),
    webpackFinal: async (config, {configType}) => {
        // configure webpack to support path aliases
        // https://plusreturn.com/blog/how-to-resolve-a-path-alias-in-storybook/
        const storybookFolder = path.resolve(__dirname);
        const projectRoot = path.resolve(storybookFolder, '../');

        const srcFolder = path.resolve(projectRoot, 'src/');

        config.resolve.alias = {
            ...config.resolve.alias,
            // make webpack replace path aliases with actual directory paths
            // mind that the linter doesn't know about these aliases => add them in tsconfig too
            '@app': srcFolder,
            '@components': path.resolve(srcFolder, 'components/')
        };
        return config;
    }
};

export default config;
