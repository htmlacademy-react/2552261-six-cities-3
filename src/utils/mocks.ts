import {OffersPreview} from '../types/offers.ts';
import {internet, name} from 'faker';
import {User} from '../types/user.ts';

export const makeOffers = (): OffersPreview => [{
  id: '1',
  title: 'Beautiful & luxurious apartment at great location',
  type: 'Apartment',
  price: 120,
  city: {
    name: 'Amsterdam',
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

