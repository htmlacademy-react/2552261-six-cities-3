import {City} from './city.ts';

export type Offer = {
  id: number;
  city: City;
  image: string;
  price: number;
  priceText: string;
  isBookMarked: boolean;
  rating: number;
  href: string;
  hrefTitle: string;
  type: string;
}

export type SortOffers = {
  [K in City]: Offers;
}

export type Offers = Offer[];
