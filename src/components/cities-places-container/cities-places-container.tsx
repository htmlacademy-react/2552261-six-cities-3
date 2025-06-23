import {SortingOptions} from '../sorting-options/sorting-options.tsx';
import {OffersList} from '../offers-list/offers-list.tsx';
import Map from '../map/map.tsx';
import React, {Dispatch, RefObject, SetStateAction} from 'react';
import {OfferPreview, OffersPreview} from '../../types/offers.ts';
import {useAppSelector} from '../../hooks';
import {getCurrentCity} from '../../store/city-process/selectors.ts';
import {getOffers} from '../../store/offers-process/selectors.ts';
import classNames from 'classnames';

type CityPlacesProps = {
  activeSort: string | null;
  clickPlacesOptionHandler: () => void;
  mousePlacesOptionHandler: () => void;
  changeSortHandler: (evt: React.MouseEvent<HTMLUListElement>) => void;
  sortedOffers: OffersPreview;
  ulCardRef: RefObject<HTMLUListElement>;
  activeCard: OfferPreview | undefined;
  setActiveCard: Dispatch<SetStateAction<OfferPreview | undefined>>;
}

export function CitiesPlacesContainer({
  activeSort,
  clickPlacesOptionHandler,
  mousePlacesOptionHandler,
  changeSortHandler,
  sortedOffers,
  ulCardRef,
  activeCard,
  setActiveCard
}: CityPlacesProps) {
  const currentCity = useAppSelector(getCurrentCity);
  const currentOffers = useAppSelector(getOffers).filter((offer) => offer.city.name === currentCity?.name);


  if (currentOffers.length === 0) {
    return (
      <div className="cities__places-container cities__places-container--empty container">
        <section className="cities__no-places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">We could not find any property available at the moment in {currentCity?.name}
            </p>
          </div>
        </section>
        <div className="cities__right-section"></div>
      </div>
    );
  }

  return (
    <div className={classNames('cities__places-container',
      {'cities__places-container--empty': currentOffers.length === 0},
      'container')}
    >
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{`${currentOffers.length} ${currentOffers.length === 1 ? 'place' : 'places'} to stay in ${currentCity?.name}`}</b>
        <SortingOptions clickPlacesOptionHandler={clickPlacesOptionHandler}
          mousePlacesOptionHandler={mousePlacesOptionHandler} changeSortHandler={changeSortHandler}
          currentSortType={activeSort} ulRef={ulCardRef}
        />
        <OffersList activeCard={activeCard} setActiveCard={setActiveCard} currentOffers={sortedOffers}/>
      </section>
      <div className="cities__right-section">
        <Map city={currentCity} points={currentOffers} activeCard={activeCard} className={'cities__map'}/>
      </div>
    </div>);
}
