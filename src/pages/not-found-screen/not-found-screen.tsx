import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';

function NotFoundScreen(): JSX.Element {
  return (
    <React.Fragment>
      <h1 className={'not-found-text'}>404. Page not found</h1>
      <img className={'not-found-img'} src={'./img/404.png'} alt="404"/>
      <Link className={'not-found-link'} to={AppRoute.Root} title={'Home'}>Вернуться на главную</Link>
    </React.Fragment>
  );
}

export default NotFoundScreen;
