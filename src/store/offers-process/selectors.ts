import {State} from '../../types/state.ts';
import {NameSpace} from '../../const.ts';

export const getOffers = (state: Pick<State, NameSpace.Offers>) => state[NameSpace.Offers].offers;
