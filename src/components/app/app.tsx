import MainScreen from '../../pages/main-screen/main-screen.tsx';
import {Route, Routes} from 'react-router-dom';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen.tsx';
import {AppRoute} from '../../const.ts';
import LoginScreen from '../../pages/login-screen/login-screen.tsx';
import OfferScreen from '../../pages/offer-screen/offer-screen.tsx';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import {User} from '../../types/user.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect, useState} from 'react';
import {fetchOffersAction} from '../../store/api-actions.ts';
import {Loader} from '../loader/loader.tsx';
import browserHistory from '../../browser-history.ts';
import HistoryRouter from '../history-route/history-route.tsx';

type AppScreenProps = {
  user: User;
}

function App({user}: AppScreenProps): JSX.Element {

  const [loading, setLoading] = useState<boolean>(true);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction(setLoading));
  }, []);

  if (loading) {
    return (<Loader/>);
  } else {
    return (
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Root}>
            <Route index element={<MainScreen user={user}/>}/>
            <Route path={AppRoute.Login} element={<LoginScreen/>}/>
            <Route path={AppRoute.Favorites} element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              ><FavoritesScreen user={user}/>
              </PrivateRoute>
            }
            />
            <Route path={`${AppRoute.Offer}/:offerId`} element={<OfferScreen user={user}/>}/>
          </Route>
          <Route path='*' element={<NotFoundScreen/>}/>
        </Routes>
      </HistoryRouter>);
  }
}

export default App;
