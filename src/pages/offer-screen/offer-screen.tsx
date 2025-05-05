import {OfferHostComponent} from '../../components/offer-host-component/offer-host-component.tsx';
import {useParams} from 'react-router-dom';
import {Offer, Offers} from '../../types/offers.ts';
import NotFoundScreen from '../not-found-screen/not-found-screen.tsx';
import {ReviewsList} from '../../components/reviews-list/reviews-list.tsx';
import {Review} from '../../types/reviews.ts';
import {ReviewsForm} from '../../components/reviews-form/reviews-form.tsx';
import {useState} from 'react';
import {OtherPlacesList} from '../../components/other-places-list/other-places-list.tsx';
import {Header} from '../header/header.tsx';
import {reviews} from '../../mocks/reviews.ts';

type OfferScreenProps = {
  offers: Offers;
}

function OfferScreen({offers}: OfferScreenProps): JSX.Element {
  const {offerId} = useParams();
  const [currentOffer, setCurrentOffer] = useState<Offer | undefined>(offers.find((offer: Offer) => offerId?.localeCompare(offer.id) === 0));
  const [isBookMarked, setBookMarked] = useState<boolean | undefined>(currentOffer?.isFavorite);
  const[reviewsState, setReviewsState] = useState({currentReviews: reviews.currentReviews.filter((review: Review) => currentOffer?.reviews.some((offerReview: string)=>
    offerReview.localeCompare(review.id) === 0))});

  const bookMarkedHandler = () => {
    setBookMarked(!isBookMarked);
  };

  if (currentOffer && reviewsState) {
    return (
      <div className="page">
        <Header offers={offers}/>
        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {currentOffer.images.map((image) => <div key={image} className="offer__image-wrapper"><img className="offer__image" src={image} alt="Photo studio"/></div>)}
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
                  <button onClick={bookMarkedHandler} className={`offer__bookmark-button button ${isBookMarked ? 'offer__bookmark-button--active' : ''}`} type="button">
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
                  <ul className="offer__inside-list">{currentOffer.goods.map((good) => (<li key={good} className="offer__inside-item">{good}</li>))}</ul>

                </div>
                <OfferHostComponent currentOffer={currentOffer}/>
                <section className="offer__reviews reviews">
                  <ReviewsList reviews={reviewsState}/>
                  <ReviewsForm setReviewsState={setReviewsState} currentReviews={reviewsState}/>
                </section>
              </div>
            </div>
            <section className="offer__map map"></section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">Other places in the neighbourhood</h2>
              <div className="near-places__list places__list">
                <OtherPlacesList offers={offers} currentOffer={currentOffer} setCurrentOffer={setCurrentOffer}/>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  } else {
    return <NotFoundScreen/>;
  }
}

export default OfferScreen;
