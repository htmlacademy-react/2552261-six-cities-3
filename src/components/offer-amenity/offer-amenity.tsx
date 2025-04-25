import {HotelAmenity} from '../../types/hotel-amenities.ts';

type OfferAmenityProps = {
  amenity: HotelAmenity;
}

export function OfferAmenity({amenity}: OfferAmenityProps): JSX.Element {
  return (
    <li className="offer__inside-item">
      {amenity.amenityName}
    </li>
  );
}
