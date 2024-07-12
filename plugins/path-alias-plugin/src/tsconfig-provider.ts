import {TsConfig} from "./models";
import {JsonParser} from "./json-parser";
import {FilePath, ITsconfigProvider} from "./tsconfig-provider.interface";
import path from 'path';

export class TsconfigProvider implements ITsconfigProvider {
    private readonly _tsconfigPath: FilePath;

    public constructor(jsonPath: string) {
        const tsconfigFullPath = path.resolve(jsonPath);
        this._tsconfigPath = {
            raw: jsonPath,
            fullName: tsconfigFullPath,
            directoryPath: path.dirname(tsconfigFullPath),
            isAbsolute: path.isAbsolute(tsconfigFullPath)
        };
    }

    public get tsconfigPath(): FilePath {
        return this._tsconfigPath;
    }

    public async provideAsync(): Promise<TsConfig> {
        return await JsonParser.parseAsync<TsConfig>(
            this.tsconfigPath.fullName
        );

    }
}