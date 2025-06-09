import {OfferPreview, OffersPreview} from '../../types/offers.ts';
import {Dispatch, SetStateAction} from 'react';
import Card from '../card/card.tsx';

type OtherPlacesListProps = {
  neighbourOffers: OffersPreview;
  activeCard: OfferPreview | null;
  setActiveCard: Dispatch<SetStateAction<OfferPreview | null>>;
}

export function NeighbourOffersList({neighbourOffers, setActiveCard, activeCard}: OtherPlacesListProps): JSX.Element {
  return (
    <div className="near-places__list places__list">{neighbourOffers.map((offer: OfferPreview) => (
      <Card key={offer.id} offer={offer} isActive={activeCard?.id === offer.id}
        setActiveCard={setActiveCard} isOtherPlacesSection
      />))}
    </div>
  );
}
