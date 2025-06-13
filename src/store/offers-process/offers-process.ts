import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {OffersProcess} from '../../types/offers-process.ts';
import {NameSpace} from '../../const.ts';
import {OffersPreview} from '../../types/offers.ts';
import {fetchOffersAction} from '../api-actions.ts';

const initialState: OffersProcess = {
  offers: [],
};

export const offerProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOffersAction.fulfilled, (state, action: PayloadAction<OffersPreview>) => {
      state.offers = action.payload;
    });
  }
}
);

