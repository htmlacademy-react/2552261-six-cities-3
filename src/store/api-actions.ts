import {createAsyncThunk} from '@reduxjs/toolkit';
import type {AppDispatch, State} from '../types/state';
import {AxiosInstance} from 'axios';
import {OfferPreview, OffersPreview} from '../types/offers.ts';
import {AppRoute} from '../const.ts';
import {redirectToRoute} from './action.ts';
import {Dispatch, SetStateAction} from 'react';
import {AuthData} from '../types/auth-data.ts';
import {User} from '../types/user.ts';
import {removeToken, setToken} from '../services/token.ts';

export const fetchOffersAction = createAsyncThunk<OffersPreview, Dispatch<SetStateAction<boolean>> | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('data/Offers', async (setLoading, {extra: api}) => {
  const {data} = await api.get<OffersPreview>(AppRoute.Offers);
  if(setLoading) {
    setLoading(false);
  }
  return data;
});

export const fetchFavoritesOffersAction = createAsyncThunk<OffersPreview, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('data/Favorites/Offers', async (_arg, {extra: api}) => {
  const {data} = await api.get<OffersPreview>(AppRoute.Favorite);
  return data;
});


export const checkAuthorization = createAsyncThunk<User, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('user/checkAuthorization', async (_arg, {extra: api}) => {
  const {data} = await api.get<User>(AppRoute.Login);
  return data;
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
}>('user/logout', async (_arg, {extra: api}) => {
  await api.delete(AppRoute.Logout);
  removeToken();
});

export const changeFavoriteStatus = createAsyncThunk<OfferPreview, {id: string | undefined; status: number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}> ('data/offers/changeStatus' ,async ({id, status}, {extra: api}) => {
  const {data} = await api.post<OfferPreview>(`${AppRoute.Favorite}/${id}/${status}`);
  return data;
});

