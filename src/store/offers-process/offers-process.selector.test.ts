import {NameSpace} from '../../const.ts';
import {makeOffers} from '../../utils/mocks.ts';
import {getOffers} from './selectors.ts';

describe('offerProcess selector', () => {
  it('should return offers', () => {
    const state = {[NameSpace.Offers]: {offers: makeOffers()}};
    const offers = state[NameSpace.Offers].offers;
    const result = getOffers(state);
    expect(result).toEqual(offers);
  });
});
