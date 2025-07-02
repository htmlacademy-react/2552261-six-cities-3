import {OffersPreview} from '../types/offers.ts';
import {internet, name} from 'faker';
import {User} from '../types/user.ts';
import { ThunkDispatch } from 'redux-thunk';
import {State} from '../types/state.ts';
import {createAPI} from '../services/api.ts';
import {Action} from 'redux';
import {AuthorizationStatus} from '../const.ts';

export const makeOffers = (): OffersPreview => [{
  id: '1',
  title: 'Beautiful & luxurious apartment at great location',
  type: 'Apartment',
  price: 120,
  city: {
    name: 'Paris',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8
    }
  },
  location: {
    latitude: 52.3909553943508,
    longitude: 4.85309666406198,
    zoom: 8
  },
  isFavorite: true,
  isPremium: false,
  rating: 1,
  previewImage: 'img/apartment-01.jpg'
}];

export const makeUser = (): User => ({
  name: name.firstName(),
  avatarUrl: internet.avatar(),
  isPro: true,
  email: internet.email(),
  token: '1GtR56JdbVcЗu',
});

export const makeFakeStoreLogin: Partial<State> = {PAGE: {isPrivatePage: false},
  USER: {authorizationStatus: AuthorizationStatus.Auth, user: makeUser()},
  CITY: {city: {name: 'Paris',
    location: {
      latitude: 48.8534,
      longitude: 2.3488,
      zoom: 10},
  }}, OFFERS: {offers: makeOffers(), offersFavorites: makeOffers(), isOffersLoading: false, hasError: {offers: false, favorites: false}}};

export const makeFakeStoreNoLogin: Partial<State> = {PAGE: {isPrivatePage: false},
  USER: {authorizationStatus: AuthorizationStatus.NoAuth, user: undefined},
  CITY: {city: {name: 'Paris',
    location: {
      latitude: 48.8534,
      longitude: 2.3488,
      zoom: 10},
  }}, OFFERS: {offers: makeOffers(), offersFavorites: makeOffers(), isOffersLoading: false, hasError: {offers: false, favorites: false}}};

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
