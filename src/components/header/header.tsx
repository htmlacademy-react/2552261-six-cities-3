import {Link, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, SIGN_OUT_TEXT} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import classNames from 'classnames';
import {logoutAction} from '../../store/api-actions.ts';
import {resetCity} from '../../store/city-process/city-process.ts';
import {getAuthorizationStatus, getUser} from '../../store/user-process/selectors.ts';
import {getFavoriteOffers} from '../../store/offers-process/selectors.ts';
import React from 'react';

export function Header(): JSX.Element {
  const offers = useAppSelector(getFavoriteOffers);
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);
  const navigate = useNavigate();

  const clickLoginHandler = (evt: React.MouseEvent<HTMLUListElement>) => {
    const target = evt.target as HTMLUListElement;
    if(target.textContent === SIGN_OUT_TEXT) {
      dispatch(logoutAction());
    } else if (target.classList.contains('user__name')) {
      navigate(AppRoute.Favorites);
    } else if (target.classList.contains('user__avatar-wrapper')) {
      navigate(AppRoute.Login);
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
                  <div className={classNames('header__avatar-wrapper', 'user__avatar-wrapper')}>
                  </div>
                  <span
                    className={classNames('header__user-name', 'user__name',
                      {'visually-hidden': authorizationStatus === AuthorizationStatus.NoAuth})}
                  >{user?.email}
                  </span>
                  <span className={classNames('header__favorite-count', {
                    'visually-hidden': authorizationStatus === AuthorizationStatus.NoAuth
                  })}
                  >{offers ? offers.length : 0}
                  </span>
                </Link>
              </li>
              <li className="header__nav-item">
                <Link className="header__nav-link" to={authorizationStatus === AuthorizationStatus.NoAuth ? AppRoute.Login : AppRoute.Root}>
                  <span
                    className={classNames({'header__signout' : authorizationStatus === AuthorizationStatus.Auth},
                      {'header__login': authorizationStatus !== AuthorizationStatus.Auth},)}
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
