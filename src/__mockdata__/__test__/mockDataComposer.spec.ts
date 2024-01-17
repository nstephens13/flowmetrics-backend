import { describe, expect, test } from '@jest/globals';
import getMockData from '../mockDataComposer';

describe('getMockData default', () => {
  test('returns correct properties for default mockData with id 0', () => {
    const result = getMockData(1);
    expect(result).toHaveProperty('id', 0);
    expect(result).toHaveProperty('name', 'Default');
    expect(result).toHaveProperty('description', 'An empty project');
    expect(result).toHaveProperty('issues', []);
    expect(result).toHaveProperty('slaSubscriber', null);
  });
});

describe('getMockData with id 3', () => {
  test('returns correct properties for mockData with id 3', () => {
    const result = getMockData(4);
    expect(result).toHaveProperty('id', 3);
    expect(result).toHaveProperty('name', 'Mocking Bird Project');
    expect(result).toHaveProperty(
      'description',
      'third mock dataset with a big number of random issues'
    );
    expect(result).toHaveProperty('issues');
    expect(result).toHaveProperty('slaSubscriber', null);
  });
});
