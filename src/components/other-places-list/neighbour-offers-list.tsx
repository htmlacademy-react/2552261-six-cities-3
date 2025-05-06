import {Offer} from '../../types/offers.ts';
import {Dispatch, SetStateAction} from 'react';
import Card from '../card/card.tsx';
import {neighbourOffers} from '../../mocks/neighbour-offers.ts';

type OtherPlacesListProps = {
  setCurrentOffer: Dispatch<SetStateAction<Offer | undefined>>;
  activeCard: Offer | null;
  setActiveCard: Dispatch<SetStateAction<Offer | null>>;
}

export function NeighbourOffersList({setCurrentOffer, setActiveCard, activeCard}: OtherPlacesListProps): JSX.Element {
  return (
    <div className="near-places__list places__list">{neighbourOffers.map((offer) => (
      <Card key={offer.id} offer={offer} isActive={activeCard?.id === offer.id} setCurrentOffer={setCurrentOffer}
        setActiveCard={setActiveCard} isOtherPlacesSection
      />))}
    </div>
  );
}
