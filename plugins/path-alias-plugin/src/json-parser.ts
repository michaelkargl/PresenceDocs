import * as JSONC from "jsonc-parser";
import fs from "node:fs/promises";

export class JsonParser {
    public static async parseAsync<T>(filePath: string): Promise<T> {
        console.debug("Parsing file: %s", filePath);
        const json = await fs.readFile(filePath, {encoding: "utf-8", flag: 'r'});
        return this.parse<T>(json);
    }

    public static parse<T>(json: string): T {
        return JSONC.parse(json) satisfies T;
    }
}