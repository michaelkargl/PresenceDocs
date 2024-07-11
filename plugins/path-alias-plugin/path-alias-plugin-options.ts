import {PluginOptions} from "@docusaurus/types";
import {Aliases} from "./aliases";

export interface PathAliasPluginOptions extends PluginOptions {
    aliases: Aliases
}