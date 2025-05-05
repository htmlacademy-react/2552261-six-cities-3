import {Offers} from '../types/offers.ts';

export const offers: Offers = [
  {
    id: '1',
    city: 'Brussels',
    image: ['img/apartment-01.jpg', 'img/room.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg', 'img/studio-01.jpg', 'img/apartment-01.jpg'],
    price: 120,
    priceText: 'night',
    isBookMarked: true,
    rating: 1,
    hrefTitle: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    bedRooms: 3,
    maxAdults: 4,
    offerHost: '1',
    isPremium: false,
    hotelAmenities: ['1', '2', '5', '10'],
    reviews: ['0b'],
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    cityy: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 8
      }
    }
  },
  {
    id: '2',
    city: 'Amsterdam',
    image: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg', 'img/studio-01.jpg', 'img/apartment-01.jpg'],
    price: 80,
    priceText: 'night',
    isBookMarked: true,
    rating: 4,
    hrefTitle: 'Wood and stone place',
    type: 'Room',
    bedRooms: 3,
    maxAdults: 4,
    offerHost: '0a',
    isPremium: true,
    hotelAmenities: ['6', '7', '3', '5', '10'],
    reviews: ['0b', '0bc'],
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    cityy: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3609553943508,
        longitude: 4.85309666406198,
        zoom: 8
      }
    }
  },
  {
    id: '3',
    city: 'Amsterdam',
    image: ['img/apartment-02.jpg', 'img/room.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg', 'img/studio-01.jpg', 'img/apartment-01.jpg'],
    price: 132,
    priceText: 'night',
    isBookMarked: false,
    rating: 3,
    hrefTitle: 'Canal View Prinsengracht',
    type: 'Apartment',
    bedRooms: 3,
    maxAdults: 4,
    offerHost: '0a',
    isPremium: false,
    hotelAmenities: ['3', '2', '8', '10'],
    reviews: ['0bc'],
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 8
    },
    cityy: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3909553943508,
        longitude: 4.929309666406198,
        zoom: 8
      }
    }
  },
  {
    id: '4',
    city: 'Paris',
    image: ['img/apartment-03.jpg', 'img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/studio-01.jpg', 'img/apartment-01.jpg'],
    price: 180,
    priceText: 'night',
    isBookMarked: true,
    rating: 5,
    hrefTitle: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
    bedRooms: 3,
    maxAdults: 4,
    offerHost: '0a',
    isPremium: false,
    hotelAmenities: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    reviews: [],
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 8
    },
    cityy: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 8
      }
    }
  }
];
