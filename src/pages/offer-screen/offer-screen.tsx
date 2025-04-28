import {OfferHostComponent} from '../../components/offer-host-component/offer-host-component.tsx';
import {useParams} from 'react-router-dom';
import {OffersHosts} from '../../types/offer-host.ts';
import {Offer, Offers} from '../../types/offers.ts';
import NotFoundScreen from '../not-found-screen/not-found-screen.tsx';
import {ReviewsList} from '../../components/reviews-list/reviews-list.tsx';
import {Review, Reviews} from '../../types/reviews.ts';
import {ReviewsForm} from '../../components/reviews-form/reviews-form.tsx';
import {useState} from 'react';
import {HotelAmenities} from '../../types/hotel-amenities.ts';
import {OfferAmenitiesList} from '../../components/offer-amentities-list/offer-amenities-list.tsx';
import {OtherPlacesList} from '../../components/other-places-list/other-places-list.tsx';
import {Header} from '../header/header.tsx';
import {OfferGallery} from '../../components/offer-gallery/offer-gallery.tsx';

type OfferScreenProps = {
  offersHosts: OffersHosts;
  reviews: Reviews;
  offers: Offers;
  hotelAmenities: HotelAmenities;
}

function OfferScreen({offersHosts, reviews, offers, hotelAmenities}: OfferScreenProps): JSX.Element {
  const {offerId} = useParams();
  const [currentOffer, setCurrentOffer] = useState<Offer | undefined>(offers.find((offer: Offer) => offerId?.localeCompare(offer.id) === 0));
  const [isBookMarked, setBookMarked] = useState<boolean | undefined>(currentOffer?.isBookMarked);
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
              <OfferGallery currentOffer={currentOffer} />
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                <div className={`offer__mark ${currentOffer.isPremium ? '' : 'visually-hidden'}`}>
                  <span>Premium</span>
                </div>
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {currentOffer.hrefTitle}
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
                    Apartment
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    3 Bedrooms
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max 4 adults
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">&euro;{currentOffer.price}</b>
                  <span className="offer__price-text">&nbsp;{currentOffer.priceText}</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <OfferAmenitiesList currentOffer={currentOffer} amenities={hotelAmenities}/>
                </div>
                <OfferHostComponent currentOffer={currentOffer} offersHosts={offersHosts}/>
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
