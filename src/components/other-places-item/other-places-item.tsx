import {Offer} from '../../types/offers.ts';
import {Link} from 'react-router-dom';

type OtherPlacesItemProps = {
  offer: Offer;
}

export function OtherPlacesItem({offer}: OtherPlacesItemProps): JSX.Element {
  const linkClickHandler = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <article className="near-places__card place-card">
      <div className="near-places__image-wrapper place-card__image-wrapper">
        <Link onClick={linkClickHandler } to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.image} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;{offer.priceText}</span>
          </div>
          <button className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${offer.rating * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.hrefTitle}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
