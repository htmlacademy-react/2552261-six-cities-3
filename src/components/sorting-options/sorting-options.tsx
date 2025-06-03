import React from 'react';

type SortingOptionsProps = {
  clickPlacesOptionHandler: () => void;
  mousePlacesOptionHandler: () => void;
  changeSortHandler: (evt: React.MouseEvent<HTMLUListElement>) => void;
  currentSortType: string | null;
}

export function SortingOptions({
  clickPlacesOptionHandler,
  mousePlacesOptionHandler,
  changeSortHandler,
  currentSortType
}: SortingOptionsProps): JSX.Element {
  return (
    <form className="places__sorting" action="#" method="get" onClick={clickPlacesOptionHandler}
      onMouseLeave={mousePlacesOptionHandler}
    >
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom" onClick={changeSortHandler}
        onMouseLeave={mousePlacesOptionHandler}
      >
        <li className="places__option places__option--active" tabIndex={0}>Popular</li>
        <li className="places__option" tabIndex={0}>Price: low to high</li>
        <li className="places__option" tabIndex={0}>Price: high to low</li>
        <li className="places__option" tabIndex={0}>Top rated first</li>
      </ul>
    </form>
  );
}
