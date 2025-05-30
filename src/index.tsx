import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import {userMock} from './mocks/userMock.ts';
import {store} from './store';
import {Provider} from 'react-redux';

const user = userMock;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App user={user}/>
    </Provider>

  </React.StrictMode>
);
