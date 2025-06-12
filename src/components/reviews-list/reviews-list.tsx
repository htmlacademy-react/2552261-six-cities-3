import {Fragment} from 'react';
import {Comment, Comments} from '../../types/comments.ts';
import {CommentComponent} from '../comment-component/comment-component.tsx';

type ReviewsListProps = {
  comments: Comments;
}

export function ReviewsList({comments}: ReviewsListProps): JSX.Element {
  return (
    <Fragment>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ul className="reviews__list">
        {comments.map((comment: Comment) => <CommentComponent key={comment.id} review={comment} />)}
      </ul>
    </Fragment>
  );
}
