"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TsconfigProvider = void 0;
const json_parser_1 = require("./json-parser");
const path_1 = __importDefault(require("path"));
class TsconfigProvider {
    _tsconfigPath;
    constructor(jsonPath) {
        const tsconfigFullPath = path_1.default.resolve(jsonPath);
        this._tsconfigPath = {
            raw: jsonPath,
            fullName: tsconfigFullPath,
            directoryPath: path_1.default.dirname(tsconfigFullPath),
            isAbsolute: path_1.default.isAbsolute(tsconfigFullPath)
        };
    }
    get tsconfigPath() {
        return this._tsconfigPath;
    }
    async provideAsync() {
        return await json_parser_1.JsonParser.parseAsync(this.tsconfigPath.fullName);
    }
}
exports.TsconfigProvider = TsconfigProvider;
