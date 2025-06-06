import {OfferPreview} from './types/offers.ts';

export function sortByLowPrice(offerOne: OfferPreview, offerTwo: OfferPreview): number{
  return offerOne.price - offerTwo.price;
}

export function sortByHighPrice(offerOne: OfferPreview, offerTwo: OfferPreview): number{
  return offerTwo.price - offerOne.price;
}

export function sortByHighRated(offerOne: OfferPreview, offerTwo: OfferPreview): number{
  return offerTwo.rating - offerOne.rating;
}
