import {FavoritesList} from '../../components/favorites-list/favorites-list.tsx';
import {Header} from '../../components/header/header.tsx';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import classNames from 'classnames';
import {Loader} from '../../components/loader/loader.tsx';
import {useAppSelector} from '../../hooks';
import {getFavoriteOffers} from '../../store/offers-process/selectors.ts';

function FavoritesScreen(): JSX.Element {

  const favoritesOffers = useAppSelector(getFavoriteOffers);

  if (favoritesOffers === undefined) {
    return (
      <Loader/>
    );
  }

  return (
    <div className={classNames('page', {'page--favorites-empty': favoritesOffers.length === 0})}>
      <Header/>
      <main className={classNames('page__main',
        'page__main--favorites',
        {'page__main--favorites-empty': favoritesOffers.length === 0}
      )}
      >
        <div className="page__favorites-container container">
          <FavoritesList favoritesOffers={favoritesOffers}/>
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
