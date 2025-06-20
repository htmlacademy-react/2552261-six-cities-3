import {NameSpace} from '../../const.ts';
import {State} from '../../types/state.ts';

export const getAuthorizationStatus = (state: Pick<State, NameSpace.User>) => state[NameSpace.User].authorizationStatus;
export const getUser = (state: Pick<State, NameSpace.User>) => state[NameSpace.User].user;
