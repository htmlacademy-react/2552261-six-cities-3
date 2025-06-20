import {AuthorizationStatus, NameSpace} from '../../const.ts';
import {makeUser} from '../../utils/mocks.ts';
import {getAuthorizationStatus, getUser} from './selectors.ts';

describe('userProcess selector', () => {
  const state = {[NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    user: makeUser()
  }
  };

  it('should return the user process state', () => {
    const user = state[NameSpace.User].user;
    const result = getUser(state);
    expect(result).toEqual(user);
  });

  it('should return the user authorization status', () => {
    const authorizationStatus = state[NameSpace.User].authorizationStatus;
    const result = getAuthorizationStatus(state);
    expect(result).toBe(authorizationStatus);
  });
});
