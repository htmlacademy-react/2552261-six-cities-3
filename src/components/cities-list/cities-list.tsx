import {CITY_LOCATIONS} from '../../const.ts';
import {City} from '../../types/city.ts';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

type citiesListProps = {
  currentCity: City | undefined;
  clickLocationHandler: (evt: React.MouseEvent<HTMLUListElement>) => void;
}

export function CitiesList({currentCity, clickLocationHandler}: citiesListProps) {
  return(
    <ul className="locations__list tabs__list" onClick={clickLocationHandler}>
      {CITY_LOCATIONS.map((city: City) =>
        (<li key={city.name} className="locations__item"><Link className={classNames('locations__item-link', 'tabs__item', {'tabs__item--active': city.name === currentCity?.name})} to="#"><span>{city.name}</span></Link></li>))}
    </ul>
  );
}
