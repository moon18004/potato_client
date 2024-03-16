// css
import styles from '../../styles/course/singlePostCourse.module.css'
// Icon
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';

import Badge from '@mui/material/Badge';
import React from 'react';
import { format } from 'timeago.js';

function Post({key, post}){
  console.log(post)
  console.log(key)
  const baseContent = ['Year / Semester', 'Professor']

  console.log(post.author)
  // const handleEdit = (e) =>{
  //   e.preventDefault();
  //   // console.log(post.author.email);
  //   // console.log(user);
  //   if(user.email !== post.author.email){
  //     return;
  //   }
  //   // console.log('edit');
  //   navigate(`/community/edit/${id}`, {state: {post}})
  // }

  return(
    <div className={styles.post}>
      <div className={styles.postHead}>
        <h2 className={styles.classCode}>{post.subject} {post.class_code}</h2>
        <div>
          <h4 className={styles.datetime}>{format(post.createdAt)}</h4>
          <h4>{post.nickname}</h4>
        </div>
      </div>
      <dl>
        {post.base_content.map((item, index) =>(
          <>
            <dt>{baseContent[index]} :  </dt>
            <dd>{item}</dd>
            <hr />
          </>
        ))}
        {post.add_content.map((item, index) => (
          <>
            <dt>
              {JSON.parse(item).key} :,
            </dt>
            <dd key={index}>
              {JSON.parse(item).val} :,
            </dd>
            <hr />
          </>
        ))}
      </dl>
      <div className={styles.badges}>
        <Badge badgeContent={post.id} className={styles.thumbsUp}>
          <ThumbUpIcon />
        </Badge>
        <Badge badgeContent={post.id}>
          <CommentIcon />
        </Badge>
      </div>
    </div>
  )
}
export default Post;