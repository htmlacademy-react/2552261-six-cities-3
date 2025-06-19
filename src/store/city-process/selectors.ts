import {NameSpace} from '../../const.ts';
import {State} from '../../types/state.ts';

export const getCurrentCity = (state: Pick<State, NameSpace.City>) => state[NameSpace.City].city;
