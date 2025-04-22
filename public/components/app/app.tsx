import MainScreen from '../../pages/main-screen/main-screen';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import {AppRoute, AuthorizationStatus} from '../../../src/const.ts';
import LoginScreen from '../../pages/login-screen/login-screen.tsx';
import OfferScreen from '../../pages/offer-screen/offer-screen.tsx';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import {Reviews} from '../../../src/types/reviews.ts';
import {Offers} from '../../../src/types/offers.ts';

type AppScreenProps = {
  offersCount: number;
  reviews: Reviews;
  offers: Offers;
}

function App({offersCount, reviews, offers}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root}>
          <Route index element={<MainScreen offersCount={offersCount} offers={offers}/>}/>
          <Route path={AppRoute.Login} element={<LoginScreen/>}/>
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.Auth}
            ><FavoritesScreen offers={offers}/>
            </PrivateRoute>
          }
          />
          <Route path={`${AppRoute.Offer}/:id`} element={<OfferScreen/>}/>
        </Route>
        <Route path='*' element={<NotFoundScreen/>}/>
      </Routes>
    </BrowserRouter>);
}

export default App;
