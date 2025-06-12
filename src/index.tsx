import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import {store} from './store';
import {Provider} from 'react-redux';
import {checkAuthorization} from './store/api-actions.ts';

store.dispatch(checkAuthorization());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);
