import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import {reviews} from './mocks/reviews.ts';
import {offers} from './mocks/offers.ts';
import {offersHosts} from './mocks/offers-hosts.ts';
import {hotelAmenitiesMock} from './mocks/hotel-amenities-mock.ts';

const OFFERS_AMOUNT: number = offers.length;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offersCount={OFFERS_AMOUNT} reviews={reviews} offers={offers} hotelAmenities={hotelAmenitiesMock} offersHosts={offersHosts}/>
  </React.StrictMode>
);
