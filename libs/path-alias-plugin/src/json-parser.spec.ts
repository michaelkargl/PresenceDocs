import { describe, it, expect} from '@jest/globals';
import testingBanana from './testing/banana.json';
import { Fruit } from './testing/Fruit';
import path from "node:path";
import { JsonParser } from "./json-parser";

describe('JsonParser', () => {
    const jsonFilePath = path.resolve(__dirname, './testing/banana.json');

    describe('parse', () => {
        it('resolves the json as-is', async () => {
            const fruit: Fruit = await JsonParser.parseAsync<Fruit>(jsonFilePath);
            expect(fruit).toEqual(testingBanana);
        });
    });
});