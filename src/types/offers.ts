import {City} from './city.ts';

export type Offer = {
  id: string;
  city: City;
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
}

export type SortOffers = {
  [K in City]: Offers;
}

export type Offers = Offer[];
export type SetOffers = Set<Offer>;
