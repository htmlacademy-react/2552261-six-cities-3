import MainScreen from '../../pages/main-screen/main-screen.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen.tsx';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import LoginScreen from '../../pages/login-screen/login-screen.tsx';
import OfferScreen from '../../pages/offer-screen/offer-screen.tsx';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import {User} from '../../types/user.ts';
import {useAppDispatch} from '../../hooks';
import {fillOffersList} from '../../store/action.ts';
import {offers} from '../../mocks/offers.ts';
import {useEffect} from 'react';

type AppScreenProps = {
  user: User;
}

function App({user}: AppScreenProps): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fillOffersList(offers));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root}>
          <Route index element={<MainScreen user={user}/>}/>
          <Route path={AppRoute.Login} element={<LoginScreen/>}/>
          <Route path={AppRoute.Favorites} element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.Auth}
            ><FavoritesScreen user={user}/>
            </PrivateRoute>
          }
          />
          <Route path={`${AppRoute.Offer}/:offerId`} element={<OfferScreen offers={offers} user={user}/>}/>
        </Route>
        <Route path='*' element={<NotFoundScreen/>}/>
      </Routes>
    </BrowserRouter>);
}

export default App;
