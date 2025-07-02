import {NameSpace} from '../../const.ts';
import {makeOffers} from '../../utils/mocks.ts';
import {getFavoriteOffers, getOffers, getOffersLoadingStatus} from './selectors.ts';

describe('offerProcess selector', () => {
  it('should return offers', () => {
    const state = {[NameSpace.Offers]: {offers: makeOffers(), offersFavorites: [], isOffersLoading: false, hasError: {offers: false, favorites: false}}};
    const offers = state[NameSpace.Offers].offers;
    const result = getOffers(state);
    expect(result).toEqual(offers);
  });
  it('should return favorite offers', () => {
    const state = {[NameSpace.Offers]: {offers: makeOffers(), offersFavorites: [], isOffersLoading: false, hasError: {offers: false, favorites: false}}};
    const offers = state[NameSpace.Offers].offersFavorites;
    const result = getFavoriteOffers(state);
    expect(result).toEqual(offers);
  });
  it('should return offers loading status', () => {
    const state = {[NameSpace.Offers]: {offers: makeOffers(), offersFavorites: [], isOffersLoading: false, hasError: {offers: false, favorites: false}}};
    const loadingDataStatus = state[NameSpace.Offers].isOffersLoading;
    const result = getOffersLoadingStatus(state);
    expect(result).toEqual(loadingDataStatus);
  });
});
