import {Fragment} from 'react';
import {Review, Reviews} from '../../types/reviews.ts';
import {Offer} from '../../types/offers.ts';
import {ReviewsComponent} from '../reviews-component/reviews-component.tsx';

type ReviewsListProps = {
  currentOffer: Offer;
  reviews: Reviews;
}

export function ReviewsList({reviews, currentOffer}: ReviewsListProps): JSX.Element {
  const currentReviews = reviews.filter((review: Review) => currentOffer.reviews.some((offerReview: string)=>
    offerReview.localeCompare(review.id) === 0));
  const listItems = currentReviews.map((review: Review) => <ReviewsComponent key={review.id} review={review} />);

  return (
    <Fragment>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{currentReviews.length}</span></h2>
      <ul className="reviews__list">
        {listItems}
      </ul>
    </Fragment>
  );
}
