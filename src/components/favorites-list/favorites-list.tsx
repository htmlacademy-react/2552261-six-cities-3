import {Offer, Offers, SortOffers} from '../../types/offers.ts';
import {FavoritesItem} from '../favorites-item/favorites-item.tsx';

type FavoritesListProps = {
  offers: Offers;
}

export function FavoritesList({offers}: FavoritesListProps): JSX.Element {
  const favoritesOffers: Offers = offers.filter((offer: Offer) => offer.isFavorite);
  const sortFavoritesOffers: SortOffers = {};

  favoritesOffers.forEach((offer: Offer) => {
    if (offer.city.name in sortFavoritesOffers) {
      sortFavoritesOffers[offer.city.name].push(offer);
    } else {
      sortFavoritesOffers[offer.city.name] = [offer];
    }
  });

  const listItems = Object.entries(sortFavoritesOffers).map(([city, offersByCity]) => {
    if(offersByCity.length > 0) {
      return <FavoritesItem key={city} city={city} offers={offersByCity}/>;
    }
  });
  return (
    <ul className="favorites__list">{listItems}</ul>
  );
}
