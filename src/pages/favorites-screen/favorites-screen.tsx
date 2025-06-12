import {FavoritesList} from '../../components/favorites-list/favorites-list.tsx';
import {Header} from '../header/header.tsx';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {useAppSelector} from '../../hooks';

function FavoritesScreen(): JSX.Element {
  const currentCity = useAppSelector((state) => state.city);
  const currentOffers = useAppSelector((state) => state.offers).filter((offer) => offer.city.name === currentCity?.name);
  return (
    <div className="page">
      <Header currentOffers={currentOffers}/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList/>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Root}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
