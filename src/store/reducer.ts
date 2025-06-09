import {createReducer} from '@reduxjs/toolkit';
import {
  changeCity,
  changeFavoriteStatus,
  fillOffersList,
  loadOffers, loadUser,
  requireAuthorization,
  resetCity
} from './action.ts';
import {OffersPreview} from '../types/offers.ts';
import {City} from '../types/city.ts';
import {AuthorizationStatus, CITY_LOCATIONS, DEFAULT_USER} from '../const.ts';
import {User} from '../types/user.ts';

type InitialState = {
  city: City | undefined;
  offers: OffersPreview;
  authorizationStatus: AuthorizationStatus;
  user: User;
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
  authorizationStatus: AuthorizationStatus.Unknown,
  user: DEFAULT_USER
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
    }).addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    }).addCase(loadUser, (state, action) => {
      state.user = action.payload;
    });
});

export {reducer};
