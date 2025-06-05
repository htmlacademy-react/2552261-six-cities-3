import {OfferPreview} from '../../types/offers.ts';
import {OffersList} from '../../components/offers-list/offers-list.tsx';
import {Header} from '../header/header.tsx';
import Map from '../../components/map/map.tsx';
import React, {useRef, useState} from 'react';
import {CITY_LOCATIONS, SortType} from '../../const.ts';
import {User} from '../../types/user.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeCity} from '../../store/action.ts';
import {CitiesList} from '../../components/cities-list/cities-list.tsx';
import {SortingOptions} from '../../components/sorting-options/sorting-options.tsx';
import {sortByHighPrice, sortByHighRated, sortByLowPrice} from '../../util.ts';

type MainScreenProps = {
  user: User;
}

function MainScreen({user}: MainScreenProps): JSX.Element {
  const ulCardRef = useRef(null);
  const [activeCard, setActiveCard] = useState<OfferPreview | null>(null);
  const [activeSort, setActiveSort] = useState<string | null>(SortType.Popular);
  const currentCity = useAppSelector((state) => state.city);
  const currentOffers = useAppSelector((state) => state.offers).filter((offer) => offer.city.name === currentCity?.name);
  let sortedOffers = [...currentOffers];
  const dispatch = useAppDispatch();

  switch (activeSort) {
    case SortType.PriceHigh:
      sortedOffers.sort(sortByHighPrice);
      break;
    case SortType.PriceLow: {
      sortedOffers.sort(sortByLowPrice);
      break;
    }
    case SortType.Rated: {
      sortedOffers.sort(sortByHighRated);
      break;
    }
    default:
      sortedOffers = [...currentOffers];
  }

  const clickPlacesOptionHandler = () => {
    const ulElement = ulCardRef.current as HTMLLIElement | null;
    if (ulElement) {
      ulElement.classList.toggle('places__options--opened');
    }
  };

  const mousePlacesOptionHandler = () => {
    const ulElement = ulCardRef.current as HTMLLIElement | null;
    if (ulElement?.classList.contains('places__options--opened')) {
      ulElement.classList.remove('places__options--opened');
    }
  };

  const clickLocationHandler = (evt: React.MouseEvent<HTMLUListElement>) => {
    const target = evt.target as HTMLElement;
    if (target.tagName === 'SPAN' || target.tagName === 'A') {
      const newLocation = CITY_LOCATIONS.find((city) => city.name === target.textContent);
      setActiveSort(SortType.Popular);
      const ul = ulCardRef.current as HTMLLIElement | null;
      if (ul) {
        Array.from(ul.children).forEach((child) => {
          if (child.textContent === SortType.Popular) {
            child.classList.add('places__option--active');
          } else {
            child.classList.remove('places__option--active');
          }
        });
      }
      dispatch(changeCity(newLocation));
    }
  };

  const changeSortHandler = (evt: React.MouseEvent<HTMLUListElement>) => {
    const target = evt.target as HTMLLIElement;
    const sortType = target.textContent;
    const ul = evt.currentTarget;
    setActiveSort(sortType);
    Array.from(ul.children).forEach((child) => {
      child.classList.remove('places__option--active');
    });
    target.classList.add('places__option--active');
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
              <SortingOptions clickPlacesOptionHandler={clickPlacesOptionHandler}
                mousePlacesOptionHandler={mousePlacesOptionHandler} changeSortHandler={changeSortHandler}
                currentSortType={activeSort} ulRef={ulCardRef}
              />
              <OffersList activeCard={activeCard} setActiveCard={setActiveCard} currentOffers={sortedOffers}/>
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
