import {Link, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, SIGN_OUT_TEXT} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import classNames from 'classnames';
import {logoutAction} from '../../store/api-actions.ts';
import {resetCity} from '../../store/city-process/city-process.ts';
import {getAuthorizationStatus, getUser} from '../../store/user-process/selectors.ts';
import {getFavoriteOffers} from '../../store/offers-process/selectors.ts';
import React from 'react';
import {getPageStatus} from '../../store/pages-process/selectors.ts';

export function Header(): JSX.Element {
  const offers = useAppSelector(getFavoriteOffers);
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const user = useAppSelector(getUser);
  const navigate = useNavigate();
  const isPrivatePage = useAppSelector(getPageStatus);

  const clickLoginHandler = (evt: React.MouseEvent<HTMLUListElement>) => {
    const target = evt.target as HTMLUListElement;
    if(target.textContent === SIGN_OUT_TEXT) {
      dispatch(logoutAction());
    } else if (target.classList.contains('user__name')) {
      navigate(AppRoute.Favorites);
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
                <Link className="header__nav-link header__nav-link--profile" to={authorizationStatus !== AuthorizationStatus.Auth ? AppRoute.Login : '#'}>
                  <div className={classNames('header__avatar-wrapper', 'user__avatar-wrapper')}>
                  </div>
                  {authorizationStatus === AuthorizationStatus.Auth && <span className='header__user-name user__name'>{user?.email}</span>}
                  {authorizationStatus === AuthorizationStatus.Auth && <span className='header__favorite-count'>{offers ? offers.length : 0}</span>}
                  {authorizationStatus !== AuthorizationStatus.Auth && <span className='header__login'>Sign in</span>}
                </Link>
              </li>
              {authorizationStatus === AuthorizationStatus.Auth &&
                <li className="header__nav-item">
                  <Link data-testid={'header-nav-link'} className="header__nav-link" to={isPrivatePage ? AppRoute.Login : '#'}>
                    <span className='header__signout'>Sign out
                    </span>
                  </Link>
                </li>}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
