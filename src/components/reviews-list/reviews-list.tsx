import {Fragment} from 'react';
import {Review, Reviews} from '../../types/reviews.ts';
import {ReviewsComponent} from '../reviews-component/reviews-component.tsx';

type ReviewsListProps = {
  reviews: Reviews;
}

export function ReviewsList({reviews}: ReviewsListProps): JSX.Element {

  return (
    <Fragment>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.currentReviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.currentReviews.map((review: Review) => <ReviewsComponent key={review.id} review={review} />)}
      </ul>
    </Fragment>
  );
}
