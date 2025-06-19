import {OfferPreview, OffersPreview} from '../../types/offers.ts';
import Card from '../card/card.tsx';

type FavoritesItemProps = {
  city: string;
  offers: OffersPreview;
}

export function FavoritesItem({city, offers}: FavoritesItemProps): JSX.Element {

  const itemsList = offers.map((offer: OfferPreview) => <Card key={offer.id} offer={offer} isFavorite isOtherPlacesSection />);

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        {itemsList}
      </div>
    </li>
  );
}
