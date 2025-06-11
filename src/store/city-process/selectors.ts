import {NameSpace} from '../../const.ts';
import {State} from '../../types/state.ts';

export const getCurrentCity = (state: State) => state[NameSpace.City].city;
