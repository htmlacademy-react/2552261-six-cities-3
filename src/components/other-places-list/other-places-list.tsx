import {Offer, Offers, SetOffers} from '../../types/offers.ts';
import {OtherPlacesItem} from '../other-places-item/other-places-item.tsx';
import {OTHER_PLACES_LIST_LENGTH} from '../../const.ts';
import {getRandomArrayElement} from '../../util.ts';
import {Dispatch, SetStateAction} from 'react';

type OtherPlacesListProps = {
  offers: Offers;
  currentOffer: Offer;
  setCurrentOffer: Dispatch<SetStateAction<Offer | undefined>>;
}

export function OtherPlacesList({offers, currentOffer, setCurrentOffer}: OtherPlacesListProps): JSX.Element {
  const randomItems: SetOffers = new Set<Offer>();
  while(randomItems.size < OTHER_PLACES_LIST_LENGTH && offers.length > 1) {
    const randomArrayElement: Offer = getRandomArrayElement(offers);
    if(currentOffer.id.localeCompare(randomArrayElement.id) === 0) {
      continue;
    }
    randomItems.add(randomArrayElement);
    if (randomItems.size === offers.length) {
      break;
    }
  }
  const listItems = Array.from(randomItems).map((offer: Offer) => <OtherPlacesItem key={offer.id} offer={offer} setCurrentOffer={setCurrentOffer}/>);
  return (
    <div className="near-places__list places__list">{listItems}</div>
  );
}
