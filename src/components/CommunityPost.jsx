import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/communityPost.module.css';

export default function CommunityPost({
  post,
  post: {
    author,
    createdAt,
    title,
    category,
    viewCount,
    likeCount,
    commentCount,
		id
  },
}) {
	const navigate = useNavigate();
  return (
    <li
			onClick={()=>{
				navigate(`/communityPost/${id}`);
			}}>
      <div className={styles.userInfo}>
        <div className={styles.user}>
        	<img src={author.countryUrl} alt='' className={styles.country} />
	        <p className={styles.author}>{author.nickname}</p>
        </div>
        <p className={styles.createdAt}>{createdAt}</p>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.info}>
        <p className={styles.category}>{category}</p>
        <div>
          <p className={styles.views}>{viewCount}</p>
          <p className={styles.comments}>{commentCount}</p>
          <p className={styles.likes}>{likeCount}</p>
        </div>
      </div>
    </li>
  );
}
