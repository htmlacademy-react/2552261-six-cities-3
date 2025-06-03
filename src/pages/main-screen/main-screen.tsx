import {Offer} from '../../types/offers.ts';
import {OffersList} from '../../components/offers-list/offers-list.tsx';
import {Header} from '../header/header.tsx';
import Map from '../../components/map/map.tsx';
import React, {useState} from 'react';
import {CITY_LOCATIONS} from '../../const.ts';
import {User} from '../../types/user.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeCity} from '../../store/action.ts';
import {CitiesList} from '../../components/cities-list/cities-list.tsx';

type MainScreenProps = {
  user: User;
}

function MainScreen({user}: MainScreenProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<Offer | null>(null);
  const currentCity = useAppSelector((state) => state.city);
  const currentOffers = useAppSelector((state) => state.offers).filter((offer) => offer.city.name === currentCity?.name);
  const dispatch = useAppDispatch();

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

  const clickLocationHandler = (evt: React.MouseEvent<HTMLUListElement>) => {
    const target = evt.target as HTMLElement;
    if (target.tagName === 'SPAN' || target.tagName === 'A') {
      const newLocation = CITY_LOCATIONS.find((city) => city.name === target.textContent);
      dispatch(changeCity(newLocation));
    }
  };

  return (
    <div className="page page--gray page--main">
      <Header user={user} currentOffers={currentOffers}/>
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList currentCity={currentCity} clickLocationHandler={clickLocationHandler}/>
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
              <OffersList activeCard={activeCard} setActiveCard={setActiveCard} currentOffers={currentOffers} />
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
