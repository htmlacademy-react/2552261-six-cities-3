import {Fragment} from 'react';
import {Comment, Comments} from '../../types/comments.ts';
import {CommentComponent} from '../comment-component/comment-component.tsx';
import {sortByDate} from '../../utils/util.ts';
import {COMMENT_MAX_TITLE} from '../../const.ts';

type ReviewsListProps = {
  comments: Comments;
}

export function ReviewsList({comments}: ReviewsListProps): JSX.Element {
  const sortComments = comments.sort(sortByDate);
  return (
    <Fragment>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ul className="reviews__list">
        {sortComments.slice(0, COMMENT_MAX_TITLE).sort(sortByDate).map((comment: Comment) => <CommentComponent key={comment.id} review={comment} />)}
      </ul>
    </Fragment>
  );
}
