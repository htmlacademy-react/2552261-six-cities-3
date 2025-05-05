import {City} from './city.ts';

export type Offer = {
  id: string;
  city: 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';
  image: string[];
  price: number;
  priceText: string;
  isBookMarked: boolean;
  rating: number;
  hrefTitle: string;
  type: string;
  bedRooms: number;
  maxAdults: number;
  offerHost: string;
  isPremium: boolean;
  hotelAmenities: string[];
  reviews: string[];
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  cityy: City;
}

export type SortOffers = {
  [K in 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf']: Offers;
}

export type Offers = Offer[];
export type SetOffers = Set<Offer>;
