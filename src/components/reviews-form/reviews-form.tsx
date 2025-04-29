import React, {Dispatch, SetStateAction, useState} from 'react';
import {Review, Reviews} from '../../types/reviews.ts';
import {nanoid} from 'nanoid';
import {RatingStar} from '../../const.ts';
import dayjs from 'dayjs';

type ReviewsListProps = {
  setReviewsState: Dispatch<SetStateAction<Reviews>>;
  currentReviews: Reviews;
}

export function ReviewsForm({setReviewsState, currentReviews}: ReviewsListProps): JSX.Element {
  const [newReview, setNewReview] = useState<Review>({
    id: '',
    avatar: '',
    name: '',
    rating: 0,
    text: '',
    dateTime: '',
  });

  function submitHandler(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const reviewWithId = { ...newReview, id: nanoid(), avatar: 'img/avatar-max.jpg', name: 'Jon', dateTime: dayjs(Date.now()).format('MMMM YYYY')};
    const newArr = Array.from(currentReviews.currentReviews);
    newArr.push(reviewWithId);
    setReviewsState({currentReviews: newArr});
    setNewReview({
      id: '',
      avatar: '',
      name: '',
      rating: 0,
      text: '',
      dateTime: ''
    });
  }

  function ratingHandler(evt: React.ChangeEvent<HTMLInputElement>) {
    setNewReview({...newReview, rating: Number(evt.target.value)});
  }

  function inputTextHandler(evt: React.ChangeEvent<HTMLTextAreaElement>) {
    setNewReview({...newReview, text: evt.target.value});
  }

  return (
    <form onSubmit={submitHandler} className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars"
          type="radio" onChange={ratingHandler} checked={newReview.rating === RatingStar.Five as number}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars"
          type="radio" onChange={ratingHandler} checked={newReview.rating === RatingStar.Four as number}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars"
          type="radio" onChange={ratingHandler} checked={newReview.rating === RatingStar.Three as number}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars"
          type="radio" onChange={ratingHandler} checked={newReview.rating === RatingStar.Two as number}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star"
          type="radio" onChange={ratingHandler} checked={newReview.rating === RatingStar.One as number}
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea onChange={inputTextHandler} className="reviews__textarea form__textarea" id="review" name="review" value={newReview.text}
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
