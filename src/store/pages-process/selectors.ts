import {State} from '../../types/state.ts';
import {NameSpace} from '../../const.ts';

export const getPageStatus = (state: Pick<State, NameSpace.Page>) => state[NameSpace.Page].isPrivatePage;
