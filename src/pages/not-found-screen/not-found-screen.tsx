import React from 'react';
import {Link} from 'react-router-dom';

function NotFoundScreen(): JSX.Element {
  return (
    <React.Fragment>
      <h1 className={'not-found-text'}>404. Page not found</h1>
      <img className={'not-found-img'} src={'./img/404.png'} alt="404"/>
      <Link className={'not-found-link'} to="/" title={'Home'}>Вернуться на главную</Link>
    </React.Fragment>
  );
}

export default NotFoundScreen;
