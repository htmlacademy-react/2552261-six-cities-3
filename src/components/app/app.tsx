import MainScreen from '../../pages/main-screen/main-screen.tsx';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen.tsx';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import LoginScreen from '../../pages/login-screen/login-screen.tsx';
import OfferScreen from '../../pages/offer-screen/offer-screen.tsx';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import {Reviews} from '../../types/reviews.ts';
import {Offers} from '../../types/offers.ts';
import {OffersHosts} from '../../types/offer-host.ts';
import {HotelAmenities} from '../../types/hotel-amenities.ts';

type AppScreenProps = {
  offersCount: number;
  reviews: Reviews;
  offers: Offers;
  offersHosts: OffersHosts;
  hotelAmenities: HotelAmenities;
}

function App({offersCount, reviews, offers, hotelAmenities, offersHosts}: AppScreenProps): JSX.Element {
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
          <Route path={`${AppRoute.Offer}/:offerId`} element={<OfferScreen offersHosts={offersHosts} reviews={reviews} offers={offers} hotelAmenities={hotelAmenities}/>}/>
        </Route>
        <Route path='*' element={<NotFoundScreen/>}/>
      </Routes>
    </BrowserRouter>);
}

export default App;
