import {Offer} from '../../types/offers.ts';
import {Dispatch, SetStateAction, useState} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.ts';

type CardScreenProps = {
  offer: Offer;
  isFavorite?: boolean;
  isOtherPlacesSection?: boolean;
  setCurrentOffer?: Dispatch<SetStateAction<Offer | undefined>>;
}

function Card({offer, isFavorite = false, isOtherPlacesSection = false, setCurrentOffer}: CardScreenProps): JSX.Element {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isBookMarked, setBookMarked] = useState<boolean>(offer.isBookMarked);

  const mouseEnterHandler = () => {
    setIsActive(true);
  };
  const mouseLeaveHandler = () => {
    setIsActive(false);
  };

  const bookMarkedHandler = () => {
    setBookMarked(!isBookMarked);
  };

  const linkClickHandler = () => {
    if (setCurrentOffer && isOtherPlacesSection) {
      setCurrentOffer({...offer});
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  };

  return (
    <article className={`${isFavorite ? 'favorites__card place-card' : 'cities__card'}
    ${isOtherPlacesSection ? 'near-places__card' : ''}
    ${isActive ? 'cities__card_active' : ''} place-card`}
    onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}
    >
      <div className={`place-card__mark ${offer.isPremium ? '' : 'visually-hidden'}`}>
        <span>Premium</span>
      </div>
      <div className={`${isFavorite ? 'favorites__image-wrapper' : 'cities__image-wrapper'}
     ${isOtherPlacesSection ? 'near-places__image-wrapper' : ''}
      place-card__image-wrapper`}
      >
        <Link onClick={linkClickHandler} to={`/${AppRoute.Offer}/${offer.id}`}>
          <img className="place-card__image" src={`${offer.image[0]}`} width={isFavorite ? '150' : '260'} height={isFavorite ? '110' : '200'}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={`${isFavorite ? 'favorites__card-info' : ''} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;{offer.priceText}</span>
          </div>
          <button
            onClick={bookMarkedHandler} className={`place-card__bookmark-button button ${isBookMarked ? 'place-card__bookmark-button--active' : ''}`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${offer.rating * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link onClick={linkClickHandler} to={`/${AppRoute.Offer}/${offer.id}`}>{offer.hrefTitle}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default Card;
