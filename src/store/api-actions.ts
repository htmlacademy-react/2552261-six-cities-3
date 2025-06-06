import {createAsyncThunk} from '@reduxjs/toolkit';
import type {State, AppDispatch} from '../types/state';
import {AxiosInstance} from 'axios';
import {OffersPreview} from '../types/offers.ts';
import {AppRoute} from '../const.ts';
import {loadOffers} from './action.ts';
import {Dispatch, SetStateAction} from 'react';

export const fetchOffersAction = createAsyncThunk<void, Dispatch<SetStateAction<boolean>>, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>('data/Offers', async (setLoading, {dispatch, extra: api}) => {
  const {data} = await api.get<OffersPreview>(AppRoute.Offers);
  setLoading(false);
  dispatch(loadOffers(data));
});
