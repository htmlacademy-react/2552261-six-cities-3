import {State} from '../../types/state.ts';
import {NameSpace} from '../../const.ts';

export const getOffers = (state: State) => state[NameSpace.Offers].offers;
