import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, SIGN_OUT_TEXT} from '../../const.ts';
import {OfferPreview, OffersPreview} from '../../types/offers.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import classNames from 'classnames';
import {logoutAction} from '../../store/api-actions.ts';
import {resetCity} from '../../store/city-process/city-process.ts';
import {getAuthorizationStatus, gettUser} from '../../store/user-process/selectors.ts';

type HeaderProps = {
  currentOffers?: OffersPreview;
}

export function Header({currentOffers}: HeaderProps): JSX.Element {
  const favoritesCount = currentOffers?.filter((offer: OfferPreview) => offer.isFavorite);
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(gettUser);

  const clickLoginHandler = (evt: React.MouseEvent<HTMLUListElement>) => {
    const target = evt.target as HTMLUListElement;
    if(target.textContent === SIGN_OUT_TEXT) {
      dispatch(logoutAction());
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.Root} className="header__logo-link header__logo-link--active"
              onClick={() => dispatch(resetCity())}
            >
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list" onClick={clickLoginHandler}>
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to="#">
                  <div className={classNames('header__avatar-wrapper', 'user__avatar-wrapper',
                    {'visually-hidden': authorizationStatus === AuthorizationStatus.NoAuth})}
                  >
                  </div>
                  <span
                    className={classNames('header__user-name', 'user__name',
                      {'visually-hidden': authorizationStatus === AuthorizationStatus.NoAuth})}
                  >{user?.email}
                  </span>
                  <span className={classNames('header__favorite-count', {
                    'visually-hidden': authorizationStatus === AuthorizationStatus.NoAuth
                  })}
                  >{favoritesCount ? favoritesCount.length : 0}
                  </span>
                </Link>
              </li>
              <li className="header__nav-item">
                <Link className="header__nav-link" to={authorizationStatus === AuthorizationStatus.NoAuth ? AppRoute.Login : AppRoute.Root}>
                  <span
                    className="header__signout"
                  >{authorizationStatus === AuthorizationStatus.Auth ? 'Sign out' : 'Sign in'}
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
