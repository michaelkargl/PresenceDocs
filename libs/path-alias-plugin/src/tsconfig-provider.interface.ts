import {TsConfig} from "./models";

export type FilePath = {
    raw: string,
    fullName: string,
    directoryPath: string,
    isAbsolute: boolean
}

export interface ITsconfigProvider {
    get tsconfigPath(): FilePath;
    provideAsync(): Promise<TsConfig>;
}