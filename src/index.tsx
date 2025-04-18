import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../public/components/app/app.tsx';
import {reviews} from './mocks/reviews.ts';
import {offers} from './mocks/offers.ts';

const OFFERS_AMOUNT: number = 684;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offersCount={OFFERS_AMOUNT} reviews={reviews} offers={offers}/>
  </React.StrictMode>
);
