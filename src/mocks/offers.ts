import {Offers} from '../types/offers.ts';

export const offers: Offers = [
  {
    id: 1,
    image: 'img/apartment-01.jpg',
    price: 120,
    priceText: '/ night',
    isBookMarked: false,
    rating: 4,
    href: '#',
    hrefTitle: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment'
  },
  {
    id: 2,
    image: 'img/room.jpg',
    price: 80,
    priceText: '/ night',
    isBookMarked: true,
    rating: 4,
    href: '#',
    hrefTitle: 'Wood and stone place',
    type: 'Room'
  },
  {
    id: 3,
    image: 'img/apartment-02.jpg',
    price: 132,
    priceText: '/ night',
    isBookMarked: false,
    rating: 4,
    href: '#',
    hrefTitle: 'Canal View Prinsengracht',
    type: 'Apartment'
  },
  {
    id: 4,
    image: 'img/apartment-03.jpg',
    price: 180,
    priceText: '/ night',
    isBookMarked: true,
    rating: 4,
    href: '#',
    hrefTitle: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment'
  }
];
