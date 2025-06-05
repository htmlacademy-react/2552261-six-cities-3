import {createAsyncThunk} from '@reduxjs/toolkit';
import type {State, AppDispatch} from '../types/state';
import {AxiosInstance} from 'axios';
import {OffersPreview} from '../types/offers.ts';
import {AppRoute} from '../const.ts';
import {loadOffers} from './action.ts';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('data/Offers', async (_arg, {dispatch, extra: api}) => {
  const {data} = await api.get<OffersPreview>(AppRoute.Offers);
  dispatch(loadOffers(data));
});
