import {Offer, Offers} from '../../types/offers.ts';
import {OffersList} from '../../components/offers-list/offers-list.tsx';
import {Header} from '../header/header.tsx';
import {Link} from 'react-router-dom';
import Map from '../../components/map/map.tsx';
import React, {useEffect, useState} from 'react';
import {City} from '../../types/city.ts';
import {CITY_LOCATIONS} from "../../const.ts";

type MainScreenProps = {
  offers: Offers;
}

function MainScreen({offers}: MainScreenProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<Offer | null>(null);
  const [currentOffers, setCurrentOffers] = useState<Offer[]>(offers.filter((offer: Offer) => offer.city.name === 'Amsterdam'));
  const [currentCity, setCurrentCity] = useState<City | undefined>({
    name: 'Amsterdam',
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8
    }});

  useEffect(() => {
    const newOffers = offers.filter((offer: Offer) => offer.city.name === currentCity?.name);
    setCurrentOffers(newOffers);
  }, [currentCity]); // Зависимость - currentOffers

  const clickLocationHandler = (evt: React.MouseEvent<HTMLUListElement>) => {
    const target = evt.target as HTMLElement;
    if (target.tagName === 'SPAN' || target.tagName === 'A') {
      const newLocation = CITY_LOCATIONS.find((city) => city.name === target.textContent);
      setCurrentCity(newLocation);
    }
  };

  return (
    <div className="page page--gray page--main">
      <Header offers={currentOffers}/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list" onClick={clickLocationHandler}>
              <li className="locations__item">
                <Link className="locations__item-link tabs__item" to="#">
                  <span>Paris</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link className="locations__item-link tabs__item" to="#">
                  <span>Cologne</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link className="locations__item-link tabs__item" to="#">
                  <span>Brussels</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link className="locations__item-link tabs__item tabs__item--active" to="#">
                  <span>Amsterdam</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link className="locations__item-link tabs__item" to="#">
                  <span>Hamburg</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link className="locations__item-link tabs__item" to="#">
                  <span>Dusseldorf</span>
                </Link>
              </li>
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{currentOffers.length} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OffersList offers={currentOffers} activeCard={activeCard} setActiveCard={setActiveCard} />
            </section>
            <div className="cities__right-section">
              <Map city={currentCity} points={currentOffers} activeCard={activeCard}></Map>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
