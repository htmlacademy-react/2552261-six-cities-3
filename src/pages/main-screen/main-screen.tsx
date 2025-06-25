import {Header} from '../../components/header/header.tsx';
import React, {useEffect, useRef, useState} from 'react';
import {CITY_LOCATIONS, SortType} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {CitiesList} from '../../components/cities-list/cities-list.tsx';
import {sortByHighPrice, sortByHighRated, sortByLowPrice} from '../../utils/util.ts';
import {changeCity} from '../../store/city-process/city-process.ts';
import {getCurrentCity} from '../../store/city-process/selectors.ts';
import {getOffers} from '../../store/offers-process/selectors.ts';
import classNames from 'classnames';
import {CitiesPlacesContainer} from '../../components/cities-places-container/cities-places-container.tsx';
import {OfferPreview} from '../../types/offers.ts';
import {changePageStatus} from "../../store/pages-process/page-process.ts";

function MainScreen(): JSX.Element {
  const ulCardRef = useRef(null);
  const [activeCard, setActiveCard] = useState<OfferPreview | undefined>(undefined);
  const [activeSort, setActiveSort] = useState<string | null>(SortType.Popular);
  const currentCity = useAppSelector(getCurrentCity);
  const currentOffers = useAppSelector(getOffers).filter((offer) => offer.city.name === currentCity?.name);
  let sortedOffers = [...currentOffers];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changePageStatus(false));
  }, []);

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
      <Header />
      <main
        className={classNames('page__main', 'page__main--index', {'page__main--index-empty': currentOffers.length === 0})}
      >
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList currentCity={currentCity} clickLocationHandler={clickLocationHandler}/>
          </section>
        </div>
        <div className="cities">
          <CitiesPlacesContainer activeSort={activeSort} clickPlacesOptionHandler={clickPlacesOptionHandler}
            mousePlacesOptionHandler={mousePlacesOptionHandler} changeSortHandler={changeSortHandler}
            sortedOffers={sortedOffers} ulCardRef={ulCardRef} activeCard={activeCard} setActiveCard={setActiveCard}
          />
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
