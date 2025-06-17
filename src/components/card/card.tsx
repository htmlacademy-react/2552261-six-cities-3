import {OfferPreview} from '../../types/offers.ts';
import {Dispatch, SetStateAction, useState} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import classNames from 'classnames';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getAuthorizationStatus} from '../../store/user-process/selectors.ts';
import {changeFavoriteStatus} from "../../services/api.ts";
import {fetchOffersAction} from "../../store/api-actions.ts";

type CardScreenProps = {
  offer: OfferPreview;
  isFavorite?: boolean;
  isOtherPlacesSection?: boolean;
  isActive?: boolean;
  setActiveCard?: Dispatch<SetStateAction<OfferPreview | null>>;
}

function Card({
  offer,
  isFavorite = false,
  isActive,
  isOtherPlacesSection = false,
  setActiveCard
}: CardScreenProps): JSX.Element {

  const [isBookMarked, setBookMarked] = useState<boolean>(offer.isFavorite);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();

  const mouseEnterHandler = () => {
    if (setActiveCard) {
      setActiveCard(offer);
    }

  };
  const mouseLeaveHandler = () => {
    if (setActiveCard) {
      setActiveCard(null);
    }
  };

  const bookMarkedHandler = () => {
    setBookMarked(!isBookMarked);
    const changeStatus = async () => {
      await  changeFavoriteStatus(offer.id, +!offer.isFavorite);
      dispatch(fetchOffersAction());
    }
   changeStatus();

  };

  const linkClickHandler = () => {
    if (isOtherPlacesSection) {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  };

  return (
    <article className={classNames(
      {'favorites__card': isFavorite},
      {'near-places__card': isOtherPlacesSection},
      {'cities__card_active': isActive},
      {'cities__card': !isFavorite && !isOtherPlacesSection},
      'place-card')}
    onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}
    >
      <div className={classNames('place-card__mark', {'visually-hidden': !offer.isPremium})}>
        <span>Premium</span>
      </div>
      <div className={classNames({'cities__image-wrapper': !isFavorite && !isOtherPlacesSection},
        {'favorites__image-wrapper': isFavorite},
        {'near-places__image-wrapper': isOtherPlacesSection},
        'place-card__image-wrapper')}
      >
        <Link onClick={linkClickHandler} to={`/${AppRoute.Offer}/${offer.id}`}>
          <img className="place-card__image" src={`${offer.previewImage}`} width={isFavorite ? '150' : '260'}
            height={isFavorite ? '110' : '200'}
            alt="Place image"
          />
        </Link>
      </div>
      <div className={classNames({'favorites__card-info': isFavorite}, 'place-card__info')}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            onClick={bookMarkedHandler}
            className={classNames('place-card__bookmark-button', 'button',
              {'place-card__bookmark-button--active': isBookMarked},
              {'visually-hidden': authorizationStatus === AuthorizationStatus.NoAuth})}
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
          <Link onClick={linkClickHandler} to={`/${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default Card;
