import {createAsyncThunk} from '@reduxjs/toolkit';
import type {State, AppDispatch} from '../types/state';
import {AxiosInstance} from 'axios';
import {OffersPreview} from '../types/offers.ts';
import {AppRoute, AuthorizationStatus} from '../const.ts';
import {loadOffers, redirectToRoute, requireAuthorization} from './action.ts';
import {Dispatch, SetStateAction} from 'react';
import {AuthData} from '../types/auth-data.ts';
import {User} from '../types/user.ts';
import {setToken} from '../services/token.ts';

export const fetchOffersAction = createAsyncThunk<void, Dispatch<SetStateAction<boolean>>, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('data/Offers', async (setLoading, {dispatch, extra: api}) => {
  const {data} = await api.get<OffersPreview>(AppRoute.Offers);
  setLoading(false);
  dispatch(loadOffers(data));
});


export const checkAuthorization = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/checkAuthorization', async (_arg, {dispatch, extra: api}) => {
  try {
    await api.get(AppRoute.Login);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/login', async ({email, password}, {dispatch, extra: api}) => {
  const {data: {token}} = await api.post<User>(AppRoute.Login, {email, password});
  setToken(token);
  dispatch(redirectToRoute(AppRoute.Root));
  dispatch(requireAuthorization(AuthorizationStatus.Auth));
});

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/logout', async (_arg, {dispatch, extra: api}) => {
  await api.delete(AppRoute.Logout);
  dispatch(redirectToRoute(AppRoute.Login));
  dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
});
