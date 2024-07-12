/**
 * Multiple file paths can be provided for a path mapping. If resolution fails for one path, the next one in the array
 * will be attempted until resolution succeeds or the end of the array is reached.
 *
 * @see https://www.typescriptlang.org/docs/handbook/modules/reference.html#fallbacks
 */
export type PathMappingTargets = string[];

/**
 * @see https://www.typescriptlang.org/docs/handbook/modules/reference.html#paths
 */
export type PathMappings = Record<string, PathMappingTargets>;

export interface TsConfig {
    extends?: string;
    compilerOptions: {
        baseUrl?: string;
        target: string;
        module: string;
        paths?: PathMappings;
    };
    include?: string[];
    exclude?: string[];
    files?: string[];
    references?: Array<{ path: string }>;
};
