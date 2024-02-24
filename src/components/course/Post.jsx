// css
import styles from '../../styles/singlePostCourse.module.css'
// Icon
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';

import Badge from '@mui/material/Badge';

function Post({key, post}){

  return(
    <div className={styles.post}>
      <div className={styles.postHead}>
        <h4>{post.class_code}</h4>
        <div>
          <p>{post.createdAt}</p>
          <p>{post.nickname}</p>
        </div>
      </div>
      <dl>
        <dt>content1</dt>
        <dd>answer1answer1answer1answer1answer1answer1answer1answer1answer1answer1</dd>
        <dt>content1</dt>
        <dd>answer1</dd>
        <dt>content1</dt>
        <dd>answer1</dd>
        <dt>content1</dt>
        <dd>answer1</dd>
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