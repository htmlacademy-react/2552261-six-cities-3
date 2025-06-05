import {Offer, Offers} from './types/offers.ts';

export function getRandomInteger(a: number, b: number){
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

export function getRandomArrayElement(arrays: Offers) {
  return arrays[getRandomInteger(0, arrays.length - 1)];
}

export function sortByLowPrice(offerOne: Offer, offerTwo: Offer): number{
  return offerOne.price - offerTwo.price;
}

export function sortByHighPrice(offerOne: Offer, offerTwo: Offer): number{
  return offerTwo.price - offerOne.price;
}

export function sortByHighRated(offerOne: Offer, offerTwo: Offer): number{
  return offerTwo.rating - offerOne.rating;
}
