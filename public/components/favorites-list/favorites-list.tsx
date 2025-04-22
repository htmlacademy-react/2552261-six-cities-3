import {Offer, Offers, SortOffers} from '../../../src/types/offers';
import {FavoritesItem} from '../favorites-item/favorites-item.tsx';

type FavoritesListProps = {
  offers: Offers;
}

export function FavoritesList({offers}: FavoritesListProps): JSX.Element {
  const favoritesOffers: Offers = offers.filter((offer: Offer) => offer.isBookMarked);
  const sortFavoritesOffers: SortOffers = {
    'Paris': [],
    'Cologne': [],
    'Brussels': [],
    'Amsterdam': [],
    'Hamburg': [],
    'Dusseldorf': []
  };
  favoritesOffers.forEach((offer: Offer) => {
    if (offer.city in sortFavoritesOffers) {
      sortFavoritesOffers[offer.city].push(offer);
    } else {
      sortFavoritesOffers[offer.city] = [offer];
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
