import { describe, expect, test } from "@jest/globals";
import getMockData from "../mockDataComposer";

describe('getMockData', () => {
    test('returns correct properties', () => {
        const result = getMockData(4);
        expect(result).toHaveProperty('id', 3);
        expect(result).toHaveProperty('name', 'Mocking Bird Project');
        expect(result).toHaveProperty('description', 'third mock dataset with a big number of random issues');
        expect(result).toHaveProperty('issues');
        expect(result).toHaveProperty('slaSubscriber', null);
    })
})