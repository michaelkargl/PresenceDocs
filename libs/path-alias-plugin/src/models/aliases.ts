export type FolderPath = string;

/**
 * Multiple file paths can be provided for a aliases. If resolution fails for one path, the next one in the array
 * will be attempted until resolution succeeds or the end of the array is reached.
 *
 * @see https://webpack.js.org/configuration/resolve/#resolvealias
 */
export interface Aliases {
    [aliasName: string]: FolderPath[]
}