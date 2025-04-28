
import {Offers} from '../../types/offers.ts';
import {FavoritesList} from '../../components/favorites-list/favorites-list.tsx';
import {Header} from '../header/header.tsx';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';

type FavoritesListScreenProps = {
  offers: Offers;
}

function FavoritesScreen({offers}: FavoritesListScreenProps): JSX.Element {
  return (
    <div className="page">
      <Header offers={offers}/>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList offers={offers}></FavoritesList>
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
