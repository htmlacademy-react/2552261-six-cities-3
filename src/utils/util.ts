import {OfferPreview} from '../types/offers.ts';
import {RefObject} from 'react';

export function sortByLowPrice(offerOne: OfferPreview, offerTwo: OfferPreview): number{
  return offerOne.price - offerTwo.price;
}

export function sortByHighPrice(offerOne: OfferPreview, offerTwo: OfferPreview): number{
  return offerTwo.price - offerOne.price;
}

export function sortByHighRated(offerOne: OfferPreview, offerTwo: OfferPreview): number{
  return offerTwo.rating - offerOne.rating;
}

export function changeFormState(state: boolean, formRef: RefObject<HTMLFormElement>) {
  const form = formRef.current as HTMLFormElement;
  Array.from(form.elements).forEach((el) => {
    const element = el as HTMLInputElement | HTMLButtonElement | HTMLSelectElement;
    element.disabled = state;
  });
}

export function getRandomElement<T>(arr: T[]): T | undefined {
  if (arr.length === 0) {
    return undefined;
  }
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}
