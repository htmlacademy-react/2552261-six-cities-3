import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import {offers} from './mocks/offers.ts';

const OFFERS_AMOUNT: number = offers.length;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offersCount={OFFERS_AMOUNT} offers={offers}/>
  </React.StrictMode>
);
