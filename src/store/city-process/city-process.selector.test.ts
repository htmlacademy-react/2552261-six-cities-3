import {describe, expect, it} from 'vitest';
import {DEFAULT_CITY, NameSpace} from '../../const.ts';
import {getCurrentCity} from './selectors.ts';

describe('city-process selector', () => {
  it('should return currentCity', () => {
    const state = {[NameSpace.City]: {city: DEFAULT_CITY}};
    const currentCity = state[NameSpace.City].city;
    const result = getCurrentCity(state);
    expect(result).toEqual(currentCity);
  });
});
