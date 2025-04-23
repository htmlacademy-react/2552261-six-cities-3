import {OfferHost, OffersHosts} from '../../types/offer-host.ts';
import {Offer} from '../../types/offers.ts';

type OfferHostProps = {
  currentOffer: Offer;
  offersHosts: OffersHosts;
}

export function OfferHostComponent({currentOffer, offersHosts}: OfferHostProps): JSX.Element {

  const offerHost: OfferHost | undefined = offersHosts.find((offersHost: OfferHost) => currentOffer?.offerHost.localeCompare(offersHost.id) === 0);

  if (offerHost) {
    return (
      <div className="offer__host">
        <h2 className="offer__host-title">{offerHost.title}</h2>
        <div className="offer__host-user user">
          <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
            <img className="offer__avatar user__avatar" src={`${offerHost.avatar}`} width="74" height="74"
              alt="Host avatar"
            />
          </div>
          <span className="offer__user-name">
            {offerHost.userName}
          </span>
          <span className="offer__user-status">
            {offerHost.status}
          </span>
        </div>
        <div className="offer__description">
          <p className="offer__text">
            A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The
            building is green and from 18th century.
          </p>
          <p className="offer__text">
            An independent House, strategically located between Rembrand Square and National Opera, but where
            the bustle of the city comes to rest in this alley flowery and colorful.
          </p>
        </div>
      </div>
    );
  } else {
    return <div/>;
  }
}
