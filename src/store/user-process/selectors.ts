import {NameSpace} from '../../const.ts';
import {State} from '../../types/state.ts';

export const getAuthorizationStatus = (state: State) => state[NameSpace.User].authorizationStatus;
export const gettUser = (state: State) => state[NameSpace.User].user;
