import {Offer, Offers} from '../../../src/types/offers';
import Card from '../card/card.tsx';

type OffersListItemProps = {
  offers: Offers;
}

export function OffersList({offers}: OffersListItemProps): JSX.Element {
  const offersItem = offers.map((offerItem: Offer) => <Card key={offerItem.id} offer={offerItem}/>);
  return (
    <div className="cities__places-list places__list tabs__content">{offersItem}</div>
  );
}
