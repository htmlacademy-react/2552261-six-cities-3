import MainScreen from '../../pages/main-screen/main-screen.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen.tsx';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import LoginScreen from '../../pages/login-screen/login-screen.tsx';
import OfferScreen from '../../pages/offer-screen/offer-screen.tsx';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import {Offers} from '../../types/offers.ts';
import {User} from '../../types/user.ts';
import {Provider} from 'react-redux';
import {store} from '../../store';

type AppScreenProps = {
  offers: Offers;
  user: User;
}

function App({offers, user}: AppScreenProps): JSX.Element {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root}>
            <Route index element={<MainScreen offers={offers} user={user}/>}/>
            <Route path={AppRoute.Login} element={<LoginScreen/>}/>
            <Route path={AppRoute.Favorites} element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              ><FavoritesScreen offers={offers} user={user}/>
              </PrivateRoute>
            }
            />
            <Route path={`${AppRoute.Offer}/:offerId`} element={<OfferScreen offers={offers} user={user}/>}/>
          </Route>
          <Route path='*' element={<NotFoundScreen/>}/>
        </Routes>
      </BrowserRouter>);
    </Provider>);
}

export default App;
