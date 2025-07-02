import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../const.ts';

export function ErrorFavoritesScreen(): JSX.Element {
  const navigate = useNavigate();

  return (
    <section className="favorites favorites--empty">
      <h1 className="visually-hidden">Favorites (error)</h1>
      <div className="favorites__status-wrapper">
        <b className="favorites__status">Не удалось загрузить данные</b>
        <button onClick={() => navigate(AppRoute.Root)}>Перейти на главную страницу</button>
      </div>
    </section>
  );
}
