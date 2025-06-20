import {OfferHostComponent} from '../../components/offer-host-component/offer-host-component.tsx';
import {useNavigate, useParams} from 'react-router-dom';
import {Offer, OffersPreview} from '../../types/offers.ts';
import NotFoundScreen from '../not-found-screen/not-found-screen.tsx';
import {ReviewsList} from '../../components/reviews-list/reviews-list.tsx';
import {Comments} from '../../types/comments.ts';
import {CommentForm} from '../../components/comment-form/comment-form.tsx';
import {useEffect, useState} from 'react';
import {Header} from '../../components/header/header.tsx';
import Map from '../../components/map/map.tsx';
import {nanoid} from 'nanoid';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeFavoriteStatus, getComments, getNearbyOffers, getOfferById} from '../../services/api.ts';
import {Loader} from '../../components/loader/loader.tsx';
import {NeighbourOffersList} from '../../components/other-places-list/neighbour-offers-list.tsx';
import classNames from 'classnames';
import {AppRoute, AuthorizationStatus, MAX_NEIGHBOURS_OFFERS_LIMIT} from '../../const.ts';
import {getAuthorizationStatus} from '../../store/user-process/selectors.ts';
import {fetchOffersAction} from '../../store/api-actions.ts';
import {getOffers} from '../../store/offers-process/selectors.ts';

function OfferScreen(): JSX.Element {
  const {offerId} = useParams();
  const activeCard = useAppSelector(getOffers).find((offer) => offer.id === offerId);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const [currentOffer, setCurrentOffer] = useState<Offer | undefined>(undefined);
  const [isBookMarked, setBookMarked] = useState<boolean | undefined>(currentOffer?.isFavorite);
  const [neighbourOffers, setNeighbourOffers] = useState<OffersPreview>([]);
  const [reviewsState, setReviewsState] = useState<Comments>([]);
  const [isNotFound, setIsNotFound] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let neighbourOffersWithCurrentOffer: OffersPreview = [];

  if (activeCard !== undefined) {
    neighbourOffersWithCurrentOffer = [activeCard, ...neighbourOffers.slice(0, MAX_NEIGHBOURS_OFFERS_LIMIT)];
  }

  const bookMarkedHandler = () => {
    setBookMarked(!isBookMarked);
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Login);
    }
    (async () => {
      await changeFavoriteStatus(offerId, +!currentOffer?.isFavorite);
      setCurrentOffer({...currentOffer!, isFavorite: isBookMarked!});
      dispatch(fetchOffersAction());
    })();
  };

  useEffect(() => {
    (async () => {
      try {
        const offer = await getOfferById(offerId);
        const reviews = await getComments(offerId);
        const nearbyOffers = await getNearbyOffers(offerId);
        setCurrentOffer(offer);
        setReviewsState(reviews);
        setNeighbourOffers(nearbyOffers);
      } catch (error) {
        setIsNotFound(true);
      }
    })();
  }, [offerId]);

  if (isNotFound) {
    return <NotFoundScreen/>;
  }

  if (currentOffer === undefined) {
    return <Loader/>;
  }

  return (
    <div className="page">
      <Header/>
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.map((image) => (
                <div key={nanoid()} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt="Photo studio"/>
                </div>))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              <div className={`offer__mark ${currentOffer.isPremium ? '' : 'visually-hidden'}`}>
                <span>Premium</span>
              </div>
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <button onClick={bookMarkedHandler}
                  className={classNames('offer__bookmark-button', 'button',
                    {'offer__bookmark-button--active': currentOffer.isFavorite && authorizationStatus === AuthorizationStatus.Auth})}
                  type="button"
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${currentOffer.rating * 20}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {`${currentOffer.bedRooms} Bedrooms`}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {`Max ${currentOffer.maxAdults} adults`}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">{currentOffer.goods.map((good) => (
                  <li key={good} className="offer__inside-item">{good}</li>))}
                </ul>

              </div>
              <OfferHostComponent currentOffer={currentOffer}/>
              <section className="offer__reviews reviews">
                <ReviewsList comments={reviewsState}/>
                <CommentForm currentOffer={currentOffer} setReviewsState={setReviewsState}
                  currentReviews={reviewsState}
                />
              </section>
            </div>
          </div>
          <Map city={currentOffer.city} points={neighbourOffersWithCurrentOffer} activeCard={activeCard}
            className={'offer__map'}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <NeighbourOffersList neighbourOffers={neighbourOffers}/>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
