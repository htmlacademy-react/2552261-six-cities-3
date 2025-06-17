import {OfferPreview, OffersPreview} from '../../types/offers.ts';
import Card from '../card/card.tsx';
import {MAX_NEIGHBOURS_OFFERS_LIMIT} from '../../const.ts';

type OtherPlacesListProps = {
  neighbourOffers: OffersPreview;

}

export function NeighbourOffersList({neighbourOffers}: OtherPlacesListProps): JSX.Element {
  neighbourOffers = neighbourOffers.slice(0, MAX_NEIGHBOURS_OFFERS_LIMIT);
  return (
    <div className="near-places__list places__list">{neighbourOffers.map((offer: OfferPreview) => (
      <Card key={offer.id} offer={offer} isOtherPlacesSection/>))}
    </div>
  );
}
