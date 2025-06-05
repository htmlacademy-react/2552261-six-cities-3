import {createReducer} from '@reduxjs/toolkit';
import {changeCity, changeFavoriteStatus, fillOffersList, loadOffers, resetCity} from './action.ts';
import {OffersPreview} from '../types/offers.ts';
import {City} from '../types/city.ts';
import {CITY_LOCATIONS} from '../const.ts';

type InitialState = {
  city: City | undefined;
  offers: OffersPreview;
}
const initialState: InitialState = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.8534,
      longitude: 2.3488,
      zoom: 8
    },
  },
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = CITY_LOCATIONS.find((city) => city.name === action.payload?.name);
    })
    .addCase(fillOffersList, (state, action) => {
      state.offers = action.payload;
    }).addCase(changeFavoriteStatus, (state, action) => {
      const addOffer = state.offers.find((offer) => offer.id === action.payload.id);
      if (addOffer) {
        addOffer.isFavorite = !addOffer.isFavorite;
      }
    }).addCase(resetCity, (state) => {
      state.city = {
        name: 'Paris',
        location: {
          latitude: 48.8534,
          longitude: 2.3488,
          zoom: 8
        },
      };
    }).addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export {reducer};
