import {describe} from 'vitest';
import {AuthorizationStatus} from '../../const.ts';
import {makeUser} from '../../utils/mocks.ts';
import {userProcess} from './user-process.ts';
import {checkAuthorization, loginAction, logoutAction} from '../api-actions.ts';

describe('userProcess slice', () => {
  const initialStateUnknown = {
    authorizationStatus: AuthorizationStatus.Unknown,
    user: undefined,
  };
  const initialStateLogin = {
    authorizationStatus: AuthorizationStatus.Auth,
    user: makeUser()
  };
  const expectedStateUnknown = {
    authorizationStatus: AuthorizationStatus.Unknown,
    user: undefined,
  };
  const expectedStateAuth = {
    authorizationStatus: AuthorizationStatus.Auth,
    user: undefined,
  };
  const expectedStateNoAuth = {
    authorizationStatus: AuthorizationStatus.NoAuth,
    user: undefined,
  };
  it('should return initial state whith empty action', () => {
    const emptyAction = {type: ''};
    const result = userProcess.reducer(initialStateLogin, emptyAction);
    expect(result).toEqual(initialStateLogin);
  });

  it('should return default state with undefined state and empty action', () => {
    const emptyAction = {type: ''};
    const result = userProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedStateUnknown);
  });

  it('should return "AUTH" with "checkAuthorization.fulfilled" action', () => {
    const result = userProcess.reducer(initialStateUnknown, checkAuthorization.fulfilled);
    expect(result).toEqual(expectedStateAuth);
  });

  it('should return "NO_AUTH" with "checkAuthorization.rejected" action', () => {
    const result = userProcess.reducer(initialStateUnknown, checkAuthorization.rejected);
    expect(result).toEqual(expectedStateNoAuth);
  });

  it('should return "AUTH" with "loginAction.fulfilled" action', () => {
    const result = userProcess.reducer(initialStateUnknown, loginAction.fulfilled);
    expect(result).toEqual(expectedStateAuth);
  });

  it('should return "NO_AUTH" with "loginAction.rejected" action', () => {
    const result = userProcess.reducer(initialStateUnknown, loginAction.rejected);
    expect(result).toEqual(expectedStateNoAuth);
  });

  it('should return "NO_AUTH" and undefined user with "logoutAction.fulfilled" action', () => {
    const result = userProcess.reducer(initialStateLogin, logoutAction.fulfilled);
    expect(result).toEqual(expectedStateNoAuth);
  });
});
