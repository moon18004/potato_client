import React from 'react';
import useCommunityComments from '../../hooks/useCommunityComments';
import Comment from './Comment';

export default function Comments({ id }) {
  const {
    commentsQuery: { loading, err, data: comments },
  } = useCommunityComments(id);
  // console.log(comments);

  return (
    <ul>
      {comments &&
        comments.map((comment) => {
          return <Comment key={comment.id} comment={comment} postId={id}/>;
        })}
    </ul>
  );
}
