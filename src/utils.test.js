import { parseChain } from './utils.js';
import { mockResponse } from './constants';

describe('parseChain', () => {
  it('finds the names of all the pokemon', () => {
    const parsedResponse = parseChain(mockResponse.chain);
    const expected = ['bulbasaur', 'ivysaur', 'venusaur'];

    expect(parsedResponse).toEqual(expected);
  });
});
