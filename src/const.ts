import {Cities} from './types/city.ts';
import {NewComment} from './types/comments.ts';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorites = '/favorite',
  Offer = 'offer',
  Offers = 'offers'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum RatingStar {
  Five = 5,
  Four = 4,
  Three = 3,
  Two = 2,
  One = 1,
}

export const CITY_LOCATIONS: Cities = [
  {
    name: 'Paris',
    location: {
      latitude: 48.8534,
      longitude: 2.3488,
      zoom: 10
    }
  },
  {
    name: 'Cologne',
    location: {
      latitude: 50.9333,
      longitude: 6.95,
      zoom: 10
    }
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.8504,
      longitude: 4.34878,
      zoom: 10
    }
  },
  {
    name: 'Amsterdam',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 10
    }
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.5753,
      longitude: 10.0153,
      zoom: 10
    }
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.2217,
      longitude: 6.77616,
      zoom: 10
    }
  }
];

export enum SortType {
  PriceLow = 'Price: low to high',
  PriceHigh = 'Price: high to low',
  Rated = 'Top rated first',
  Popular = 'Popular',
}

export const DEFAULT_COMMENT: NewComment = {
  rating: 0,
  comment: '',
};

export const DEFAULT_CITY = {
  name: 'Paris',
  location: {
    latitude: 48.8534,
    longitude: 2.3488,
    zoom: 8
  }
};

export const DEFAULT_USER = undefined;

export const DEFAULT_COMMENT_MIN_LENGTH = 50;

export const SIGN_OUT_TEXT = 'Sign out';

export enum NameSpace {
  City = 'CITY',
  Offers = 'OFFERS',
  User = 'USER',
}

export const MAX_NEIGHBOURS_OFFERS_LIMIT = 3;

export const URL_MARKER_DEFAULT =
  'markup/img/pin.svg';

export const URL_MARKER_CURRENT =
  'markup/img/pin-active.svg';
