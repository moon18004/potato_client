// css
import styles from '../../styles/singlePostCourse.module.css'
// Icon
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';

function Post(){

  return(
    <>
      <div className={styles.postHead}>
        <h4>CSE123</h4>
        <div>
          <p>2023.02.21</p>
          <p>Nick Name</p>
        </div>
      </div>
      <dl>
        <dt>content1</dt>
        <dd>answer1</dd>
        <dt>content1</dt>
        <dd>answer1</dd>
        <dt>content1</dt>
        <dd>answer1</dd>
        <dt>content1</dt>
        <dd>answer1</dd>
      </dl>
      <ThumbUpIcon />
      <CommentIcon />
    </>
  )
}
export default Post;