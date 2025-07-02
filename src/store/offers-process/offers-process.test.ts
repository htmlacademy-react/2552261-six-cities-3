import {describe, expect, it} from 'vitest';
import {makeOffers} from '../../utils/mocks.ts';
import {offerProcess} from './offers-process.ts';
import {fetchOffersAction} from '../api-actions.ts';

describe('offersProcess slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const initialState = {offers: makeOffers(), offersFavorites: [], isOffersLoading: false, hasError: {offers: false, favorites: false}};
    const result = offerProcess.reducer(initialState, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should return the default state with undefined state and empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {offers: [], offersFavorites: [], isOffersLoading: false, hasError: {offers: false, favorites: false}};
    const result = offerProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it('should change state with "fetchOffersAction" action', () => {
    const expectedState = {offers: makeOffers(), offersFavorites: [], isOffersLoading: false, hasError: {offers: false, favorites: false}};
    const mockOffers = makeOffers();
    const result = offerProcess.reducer(undefined, fetchOffersAction.fulfilled(mockOffers, '', undefined));
    expect(result).toEqual(expectedState);
  });
});
