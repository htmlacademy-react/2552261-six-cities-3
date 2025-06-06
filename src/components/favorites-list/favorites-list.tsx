import {OfferPreview, OffersPreview, SortOffers} from '../../types/offers.ts';
import {FavoritesItem} from '../favorites-item/favorites-item.tsx';
import {useAppSelector} from '../../hooks';

export function FavoritesList(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const favoritesOffers: OffersPreview = offers.filter((offer: OfferPreview) => offer.isFavorite);
  const sortFavoritesOffers: SortOffers = {};

  favoritesOffers.forEach((offer: OfferPreview) => {
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
