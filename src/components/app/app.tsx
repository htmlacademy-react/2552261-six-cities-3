import MainScreen from '../../pages/main-screen/main-screen.tsx';
import {Route, Routes} from 'react-router-dom';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen.tsx';
import {AppRoute} from '../../const.ts';
import LoginScreen from '../../pages/login-screen/login-screen.tsx';
import OfferScreen from '../../pages/offer-screen/offer-screen.tsx';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import {useAppDispatch} from '../../hooks';
import {useEffect, useState} from 'react';
import {fetchFavoritesOffersAction, fetchOffersAction} from '../../store/api-actions.ts';
import {Loader} from '../loader/loader.tsx';
import browserHistory from '../../browser-history.ts';
import HistoryRouter from '../history-route/history-route.tsx';

function App(): JSX.Element {

  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction(setLoading));
    dispatch(fetchFavoritesOffersAction());
  }, []);

  if (loading) {
    return (<Loader/>);
  } else {
    return (
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Root}>
            <Route index element={<MainScreen/>}/>
            <Route path={AppRoute.Login} element={<LoginScreen/>}/>
            <Route path={AppRoute.Favorites} element={
              <PrivateRoute><FavoritesScreen/></PrivateRoute>
            }
            />
            <Route path={`${AppRoute.Offer}/:offerId`} element={<OfferScreen/>}/>
          </Route>
          <Route path='*' element={<NotFoundScreen/>}/>
        </Routes>
      </HistoryRouter>);
  }
}

export default App;
