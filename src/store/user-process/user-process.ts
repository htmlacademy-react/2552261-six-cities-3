import {AuthorizationStatus, DEFAULT_USER, NameSpace} from '../../const.ts';
import {UserProcess} from '../../types/user-process.ts';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../types/user.ts';
import {checkAuthorization, loginAction, logoutAction} from '../api-actions.ts';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: DEFAULT_USER
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthorization.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthorization.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state, action: PayloadAction<User>) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = action.payload;
      }).addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = DEFAULT_USER;
      });
  }
});
