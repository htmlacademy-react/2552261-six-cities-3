import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {Offer, Offers} from '../../types/offers.ts';
import {User} from '../../types/user.ts';
import {City} from '../../types/city.ts';

type HeaderProps = {
  offers?: Offers;
  user?: User;
  currentCity?: City | undefined;
  currentOffer?: Offer | undefined;
}

export function Header({offers, user, currentCity, currentOffer}: HeaderProps): JSX.Element {
  const favoritesCount = offers?.filter((offer: Offer) => (offer.city.name === currentCity?.name || offer.city.name === currentOffer?.city?.name) && offer.isFavorite);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.Root} className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">{user?.email}</span>
                  <span className="header__favorite-count">{favoritesCount?.length}</span>
                </Link>
              </li>
              <li className="header__nav-item">
                <Link className="header__nav-link" to="#">
                  <span className="header__signout">Sign out</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
