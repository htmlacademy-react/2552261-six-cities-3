import {Offers} from '../types/offers.ts';

export const offers: Offers = [
  {
    id: 1,
    city: 'Brussels',
    image: 'img/apartment-01.jpg',
    price: 120,
    priceText: '/ night',
    isBookMarked: true,
    rating: 1,
    href: '#',
    hrefTitle: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment'
  },
  {
    id: 2,
    city: 'Amsterdam',
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
    city: 'Amsterdam',
    image: 'img/apartment-02.jpg',
    price: 132,
    priceText: '/ night',
    isBookMarked: false,
    rating: 3,
    href: '#',
    hrefTitle: 'Canal View Prinsengracht',
    type: 'Apartment'
  },
  {
    id: 4,
    city: 'Paris',
    image: 'img/apartment-03.jpg',
    price: 180,
    priceText: '/ night',
    isBookMarked: true,
    rating: 5,
    href: '#',
    hrefTitle: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment'
  }
];
