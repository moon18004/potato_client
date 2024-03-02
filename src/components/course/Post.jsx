// css
import styles from '../../styles/singlePostCourse.module.css'
// Icon
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';

import Badge from '@mui/material/Badge';
import React from 'react';

function Post({key, post}){
  
  return(
    <div className={styles.post}>
      <div className={styles.postHead}>
        <h4>{post.subject} {post.class_code}</h4>
        <div>
          <p>{post.createdAt}</p>
          <p>{post.nickname}</p>
        </div>
      </div>
      <dl>
        <dt>class name : </dt>
        <dd>{post.class_code}</dd>
        {post.base_content.map(item =>(
          <>
            <dd>
              value : {item}
            </dd>
          </>
        ))}
        {post.add_content.map((item, index) => (
          <>
            <dt>
              key: {JSON.parse(item).key},
            </dt>
            <dd key={index}>
              value: {JSON.parse(item).val},
            </dd>
          </>
        
        ))}
        
        
      </dl>
      <Badge badgeContent={post.id}>
        <ThumbUpIcon />
      </Badge>
      <Badge badgeContent={post.id}>
        <CommentIcon />
      </Badge>
    </div>
  )
}
export default Post;