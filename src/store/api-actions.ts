import {createAsyncThunk} from '@reduxjs/toolkit';
import type {AppDispatch, State} from '../types/state';
import {AxiosInstance} from 'axios';
import {OffersPreview} from '../types/offers.ts';
import {AppRoute} from '../const.ts';
import {redirectToRoute} from './action.ts';
import {Dispatch, SetStateAction} from 'react';
import {AuthData} from '../types/auth-data.ts';
import {User} from '../types/user.ts';
import {setToken} from '../services/token.ts';

export const fetchOffersAction = createAsyncThunk<OffersPreview, Dispatch<SetStateAction<boolean>>, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('data/Offers', async (setLoading, {extra: api}) => {
  const {data} = await api.get<OffersPreview>(AppRoute.Offers);
  setLoading(false);
  return data;
});


export const checkAuthorization = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/checkAuthorization', async (_arg, {extra: api}) => {
  await api.get(AppRoute.Login);
});

export const loginAction = createAsyncThunk<User, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/login', async ({email, password}, {dispatch, extra: api}) => {
  const {data} = await api.post<User>(AppRoute.Login, {email, password});
  setToken(data.token);
  dispatch(redirectToRoute(AppRoute.Root));
  return data;
});

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/logout', async (_arg, {dispatch, extra: api}) => {
  await api.delete(AppRoute.Logout);
  dispatch(redirectToRoute(AppRoute.Login));
});
