import {Offer, Offers} from '../../types/offers.ts';
import Card from '../card/card.tsx';
import {useState} from 'react';

type OffersListItemProps = {
  offers: Offers;
}

export function OffersList({offers}: OffersListItemProps): JSX.Element {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const offersItem = offers.map((offerItem: Offer) => (<Card key={offerItem.id} offer={offerItem} isActive={activeCardId === offerItem.id} setActiveCardId={setActiveCardId}/>));
  return (
    <div className="cities__places-list places__list tabs__content">{offersItem}</div>
  );
}
