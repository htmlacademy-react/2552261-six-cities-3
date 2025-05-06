import {Offer} from '../../types/offers.ts';
import classNames from 'classnames';

type OfferHostProps = {
  currentOffer: Offer;
}

export function OfferHostComponent({currentOffer}: OfferHostProps): JSX.Element {


  return (
    <div className="offer__host">
      <h2 className="offer__host-title">{currentOffer.title}</h2>
      <div className="offer__host-user user">
        <div className={classNames('offer__avatar-wrapper',
          {'offer__avatar-wrapper--pro': currentOffer.host.isPro},
          'user__avatar-wrapper')}
        >
          <img className="offer__avatar user__avatar" src={`${currentOffer.host.avatarUrl}`} width="74" height="74"
            alt="Host avatar"
          />
        </div>
        <span className="offer__user-name">
          {currentOffer.host.name}
        </span>
        <span className="offer__user-status">
          {currentOffer.host.isPro ? 'Pro' : ''}
        </span>
      </div>
      <div className="offer__description">
        <p className="offer__text">
          {currentOffer.description}
        </p>
      </div>
    </div>
  );
}

