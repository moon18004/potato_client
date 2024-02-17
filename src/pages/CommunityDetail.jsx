import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../styles/communityDetail.module.css';
import { useParams } from 'react-router-dom';

import useCommunity from '../hooks/useCommunity';
import useCommunityDetail from '../hooks/useCommunityDetail';

export default function CommunityDetail() {
  const { id } = useParams();
  console.log(id);
  // const {author, category, createdAt, viewCount, title, content, likeCount} = getCommunityById(id);
  const {
    postQuery: { isLoading, error, data: post },
  } = useCommunityDetail(id);
  console.log(post);

  // const {author, category, createdAt, viewCount, title, content, likeCount} = post
  // const post = getCommunityById(id);
  // console.log(category);

  return (
    <>
      {error && <p>{error}</p>}
      {post && (
        <div className={styles.post}>
          <p className={styles.header}>Community / {post.category}</p>
          <div className={styles.user} >
            <img src={post.author.countryUrl} alt='' className={styles.country} />
            <p className={styles.author}>{post.author.nickname}</p>
          </div>
          <div className={styles.data}>
            <p className={styles.createdAt}>{post.createdAt}</p>
            <p className={styles.views}>{post.viewCount}</p>
            <p className={styles.likes}>{post.likeCount}</p>
          </div>
          <h2 className={styles.title}>{post.title}</h2>
          <p className={styles.content}>{post.content}</p>
        </div>
      )}
    </>
  );
}
