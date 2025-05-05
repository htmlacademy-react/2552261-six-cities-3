import {Offer} from '../../types/offers.ts';
import {OfferGalleryItem} from '../offer-gallery-item/offer-gallery-item.tsx';
import {nanoid} from 'nanoid';

type OfferGalleryProps = {
  currentOffer: Offer;
}

export function OfferGallery({currentOffer}: OfferGalleryProps): JSX.Element {
  const offerGalleryItems = currentOffer.image.map((image: string) => <OfferGalleryItem key={nanoid()} offerImage={image} />);

  return (
    <div className="offer__gallery">
      {offerGalleryItems}
    </div>
  );
}
