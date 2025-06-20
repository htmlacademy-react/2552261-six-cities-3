import React, {Dispatch, SetStateAction, useState} from 'react';
import {Comments, NewComment} from '../../types/comments.ts';
import {AuthorizationStatus, DEFAULT_COMMENT, DEFAULT_COMMENT_MIN_LENGTH, RatingStar} from '../../const.ts';
import {useAppSelector} from '../../hooks';
import classNames from 'classnames';
import {postComment} from '../../services/api.ts';
import {Offer} from '../../types/offers.ts';
import {getAuthorizationStatus} from '../../store/user-process/selectors.ts';

type ReviewsListProps = {
  setReviewsState: Dispatch<SetStateAction<Comments>>;
  currentReviews: Comments;
  currentOffer: Offer;
}

export function CommentForm({currentOffer, setReviewsState, currentReviews}: ReviewsListProps): JSX.Element {
  const ratingEntries = Object.entries(RatingStar).filter(([, value]) =>
    typeof value === 'number'
  );
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const [newReview, setNewReview] = useState<NewComment>(DEFAULT_COMMENT);


  function submitHandler(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const newArr = [...currentReviews];
    const fetchPostComment = async () => {
      const newComment = await postComment(currentOffer.id, newReview);
      newArr.push(newComment);
      setNewReview(DEFAULT_COMMENT);
      setReviewsState(newArr);
    };
    fetchPostComment();
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
        value={newReview.comment} minLength={DEFAULT_COMMENT_MIN_LENGTH}
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
