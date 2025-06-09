import React, {Dispatch, SetStateAction, useState} from 'react';
import {Reviews} from '../../types/reviews.ts';
import {nanoid} from 'nanoid';
import {AuthorizationStatus, RatingStar} from '../../const.ts';
import dayjs from 'dayjs';
import {User} from '../../types/user.ts';
import {useAppSelector} from '../../hooks';
import classNames from 'classnames';

type ReviewsListProps = {
  setReviewsState: Dispatch<SetStateAction<Reviews | null>>;
  currentReviews: Reviews;
  user: User;
}

export function ReviewsForm({setReviewsState, currentReviews, user}: ReviewsListProps): JSX.Element {
  const ratingEntries = Object.entries(RatingStar).filter(([, value]) =>
    typeof value === 'number'
  );
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
    user: user,
  });

  function submitHandler(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const reviewWithId = {
      ...newReview,
      id: nanoid(),
      date: dayjs(Date.now()).format('MMMM YYYY')
    };
    const newArr = Array.from(currentReviews.currentReviews);
    newArr.push(reviewWithId);
    setReviewsState({currentReviews: newArr});
    setNewReview({
      rating: 0,
      comment: '',
      user: user,
    });
  }

  function inputHandler(evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    const {name, value} = evt.target;
    setNewReview({...newReview, [name === 'review' ? 'comment' : 'rating']: name === 'rating' ? Number(value) : value});
  }

  return (
    <form onSubmit={submitHandler} className={classNames('reviews__form form',
      {'visually-hidden': authorizationStatus === AuthorizationStatus.NoAuth})} action="#" method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratingEntries.map(([key, value]) => (
          <React.Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              onChange={inputHandler}
              checked={newReview.rating === Number(value)}
            />
            <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label"
              title={key.toLowerCase()}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"/>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea onChange={inputHandler} className="reviews__textarea form__textarea" id="review" name="review"
        value={newReview.comment}
        placeholder="Tell how was your stay, what you like and what can be improved"
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={false}>Submit
        </button>
      </div>
    </form>
  );
}
