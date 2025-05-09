import {Offer, Offers} from '../../types/offers.ts';
import {OffersList} from '../../components/offers-list/offers-list.tsx';
import {Header} from '../header/header.tsx';
import {Link} from 'react-router-dom';
import Map from '../../components/map/map.tsx';
import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import {City} from '../../types/city.ts';
import {CITY_LOCATIONS} from '../../const.ts';
import {User} from '../../types/user.ts';

type MainScreenProps = {
  offers: Offers;
  user: User;
}

function MainScreen({offers, user}: MainScreenProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<Offer | null>(null);
  const [currentOffers, setCurrentOffers] = useState<Offer[]>(offers.filter((offer: Offer) => offer.city.name === 'Amsterdam'));
  const [currentCity, setCurrentCity] = useState<City | undefined>({
    name: 'Amsterdam',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8
    }});

  const clickPlacesOptionHandler = () => {
    const ulElement = document.querySelector('.places__options');
    if (ulElement) {
      ulElement.classList.toggle('places__options--opened');
    }
  };

  const mousePlacesOptionHandler = () => {
    const ulElement = document.querySelector('.places__options');
    if (ulElement?.classList.contains('places__options--opened')) {
      ulElement.classList.remove('places__options--opened');
    }
  };

  useEffect(() => {
    const newOffers = offers.filter((offer: Offer) => offer.city.name === currentCity?.name);
    setCurrentOffers(newOffers);
  }, [currentCity]);

  const clickLocationHandler = (evt: React.MouseEvent<HTMLUListElement>) => {
    const target = evt.target as HTMLElement;
    if (target.tagName === 'SPAN' || target.tagName === 'A') {
      const newLocation = CITY_LOCATIONS.find((city) => city.name === target.textContent);
      setCurrentCity(newLocation);
    }
  };

  return (
    <div className="page page--gray page--main">
      <Header offers={currentOffers} user={user} currentCity={currentCity}/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list" onClick={clickLocationHandler}>
              {CITY_LOCATIONS.map((city: City) =>
                (<li key={city.name} className="locations__item"><Link className={classNames('locations__item-link', 'tabs__item', {'tabs__item--active': city.name === currentCity?.name})} to="#"><span>{city.name}</span></Link></li>))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{`${currentOffers.length} places to stay in ${currentCity?.name}`}</b>
              <form className="places__sorting" action="#" method="get" onClick={clickPlacesOptionHandler} onMouseLeave={mousePlacesOptionHandler}>
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom" onMouseLeave={mousePlacesOptionHandler}>
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OffersList offers={currentOffers} activeCard={activeCard} setActiveCard={setActiveCard} />
            </section>
            <div className="cities__right-section">
              <Map city={currentCity} points={currentOffers} activeCard={activeCard} className={'cities__map'}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
