import {describe, expect, it} from 'vitest';
import {changeCity, cityProcess, resetCity} from './city-process.ts';
import {DEFAULT_CITY} from '../../const.ts';

describe('CityProcess slice', () => {
  const cologneCity = {
    name: 'Cologne',
    location: {
      latitude: 50.9333,
      longitude: 6.95,
      zoom: 10
    }
  };

  it('should return the initial state with empty action', () => {
    const initialState = {city: DEFAULT_CITY};
    const emptyAction = {type: ''};
    const result = cityProcess.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return the default state with undefined state and empty action', () => {
    const expectedState = {city: DEFAULT_CITY};
    const emptyAction = {type: ''};
    const result = cityProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should return change state with "changeCity" action', () => {
    const expectedState = cologneCity;
    const result = cityProcess.reducer(undefined, changeCity(expectedState));
    expect(result.city).toEqual(expectedState);
  });

  it('should reset state to default with "resetState" action', () => {
    const expectedState = {city: DEFAULT_CITY};
    const newState = cologneCity;
    let result = cityProcess.reducer(undefined, changeCity(newState));
    expect(result.city).toEqual(newState);
    result = cityProcess.reducer(undefined, resetCity);
    expect(result).toEqual(expectedState);
  });
});
