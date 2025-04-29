import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';

const OFFERS_AMOUNT: number = 684;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offersCount={OFFERS_AMOUNT}/>
  </React.StrictMode>
);
