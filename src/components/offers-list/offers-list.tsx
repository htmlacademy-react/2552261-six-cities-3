import {OfferPreview, OffersPreview} from '../../types/offers.ts';
import Card from '../card/card.tsx';
import {Dispatch, SetStateAction} from 'react';

type OffersListItemProps = {
  activeCard: OfferPreview | undefined;
  setActiveCard: Dispatch<SetStateAction<OfferPreview | undefined>>;
  currentOffers: OffersPreview;
}

export function OffersList({activeCard, setActiveCard, currentOffers}: OffersListItemProps): JSX.Element {
  const offersItem = currentOffers.map((offerItem: OfferPreview) => (<Card key={offerItem.id} offer={offerItem} isActive={activeCard?.id === offerItem.id} setActiveCard={setActiveCard} />));
  return (
    <div className="cities__places-list places__list tabs__content">{offersItem}</div>
  );
}
