import {Offer, Offers} from '../../types/offers.ts';
import Card from '../card/card.tsx';
import {Dispatch, SetStateAction} from 'react';

type OffersListItemProps = {
  offers: Offers;
  activeCard: Offer | null;
  setActiveCard: Dispatch<SetStateAction<Offer | null>>;
}

export function OffersList({offers, activeCard, setActiveCard}: OffersListItemProps): JSX.Element {
  const offersItem = offers.map((offerItem: Offer) => (<Card key={offerItem.id} offer={offerItem} isActive={activeCard?.id === offerItem.id} setActiveCard={setActiveCard} />));
  return (
    <div className="cities__places-list places__list tabs__content">{offersItem}</div>
  );
}
