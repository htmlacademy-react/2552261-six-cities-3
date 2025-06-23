import {OfferPreview, OffersPreview, SortOffers} from '../../types/offers.ts';
import {FavoritesItem} from '../favorites-item/favorites-item.tsx';
import {FavoritesEmpty} from '../favorites-emty/favorites-empty.tsx';
import {useRef} from 'react';

type FavoritesListProps = {
  favoritesOffers: OffersPreview;
}

export function FavoritesList({favoritesOffers}: FavoritesListProps): JSX.Element {
  const sortFavoritesOffers: SortOffers = {};
  const ulRef = useRef<HTMLUListElement>(null);

  if (favoritesOffers.length === 0) {
    return (<FavoritesEmpty/>);
  }

  favoritesOffers.forEach((offer: OfferPreview) => {
    if (offer.city.name in sortFavoritesOffers) {
      sortFavoritesOffers[offer.city.name].push(offer);
    } else {
      sortFavoritesOffers[offer.city.name] = [offer];
    }
  });

  const listItems = Object.entries(sortFavoritesOffers).map(([city, offersByCity]) => {
    if (offersByCity.length > 0) {
      return <FavoritesItem key={city} city={city} offers={offersByCity}/>;
    }
  });
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list" ref={ulRef}>{listItems}</ul>
    </section>
  );
}
