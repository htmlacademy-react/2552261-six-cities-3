import {createReducer} from '@reduxjs/toolkit';
import {changeCity, fillOffersList} from './action.ts';

const initialState = {
  city: {
    name: '',
    location: {
      latitude: null,
      longitude: null,
      zoom: 0,
    },
    offer: null,
  }
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state) => state)
    .addCase(fillOffersList, (state) => state);
});

export {reducer};
