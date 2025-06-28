import {Offer, OfferPreview} from '../types/offers.ts';
import {RefObject} from 'react';
import {Comment} from '../types/comments.ts';

export function sortByLowPrice(offerOne: OfferPreview, offerTwo: OfferPreview): number{
  return offerOne.price - offerTwo.price;
}

export function sortByHighPrice(offerOne: OfferPreview, offerTwo: OfferPreview): number{
  return offerTwo.price - offerOne.price;
}

export function sortByHighRated(offerOne: OfferPreview, offerTwo: OfferPreview): number{
  return offerTwo.rating - offerOne.rating;
}

export function sortByDate(commentOne: Comment, commentTwo: Comment): number{
  const dateOne = new Date(commentOne.date).getTime();
  const dateTwo = new Date(commentTwo.date).getTime();
  return dateTwo - dateOne;
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

export function offerAdapter(offer: Offer): OfferPreview {
  return {
    id: offer.id,
    title: offer.title,
    type: offer.type,
    price: offer.price,
    city: {
      name: offer.city.name,
      location: {
        latitude: offer.city.location.latitude,
        longitude: offer.city.location.longitude,
        zoom: offer.city.location.zoom,
      }
    },
    location: {
      latitude: offer.location.latitude,
      longitude: offer.location.longitude,
      zoom: offer.location.zoom,
    },
    isFavorite: offer.isFavorite,
    isPremium: offer.isPremium,
    rating: offer.rating,
    previewImage: ''
  };
}
