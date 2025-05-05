import {Offer} from '../../types/offers.ts';
import {HotelAmenities} from '../../types/hotel-amenities.ts';
import {OfferAmenity} from '../offer-amenity/offer-amenity.tsx';

type OfferAmenitiesListProps = {
  currentOffer: Offer;
  amenities: HotelAmenities;
}

export function OfferAmenitiesList({currentOffer, amenities}: OfferAmenitiesListProps): JSX.Element {
  const currentAmenities = amenities.filter((amenity) => currentOffer.hotelAmenities.some((offerAmentity) => amenity.id.localeCompare(offerAmentity) === 0));
  const listItems = currentAmenities.map((amenity) => <OfferAmenity key={amenity.id} amenity={amenity} />);
  return (
    <ul className="offer__inside-list">{listItems}</ul>
  );
}
