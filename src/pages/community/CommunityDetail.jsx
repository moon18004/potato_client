import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../../styles/community/communityDetail.module.css';
import { useParams } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

import useCommunity from '../../hooks/useCommunity';
import useCommunityDetail from '../../hooks/useCommunityDetail';
import { Link } from 'react-router-dom';
import { increaseView } from '../../api/community';
import TextField from '@mui/material/TextField';
import useCommunityComments from '../../hooks/useCommunityComments';
import Comments from '../../components/community/Comments';

export default function CommunityDetail() {
  const { id } = useParams();
  const { user, verified, setVerified } = useOutletContext();
  const { deletePost } = useCommunity();
  const navigate = useNavigate();
  const [comment, setComment] = useState({});
  // console.log(user);

  const {
    postQuery: { isLoading, error, data: post },
  } = useCommunityDetail(id);

  const { addComment } = useCommunityComments(id);

  const handleComment = (e) => {
    const { name, value } = e.target;
    setComment({ [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await addComment.mutateAsync({ comment });
    console.log(res);
    if (res.error) {
      console.log(res.message);
    } else {
      setComment({ content: '' });
    }
  };
  // console.log(user);

  // const {author, category, createdAt, viewCount, title, content, likeCount} = getCommunityById(id);

  // console.log(post);

  useEffect(() => {
    increaseView(id);
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    const ans = confirm('Do you want to delete this post?');
    if (ans) {
      const res = await deletePost.mutateAsync(id);
      // console.log(res);
      if (res.error) {
        alert(res.message);
      } else {
        navigate('/community');
      }
    }
  };
  const handleEdit = (e) => {
    e.preventDefault();
    // console.log(post.author.email);
    // console.log(user);
    if (user.email !== post.author.email) {
      return;
    }
    // console.log('edit');
    navigate(`/community/edit/${id}`, { state: { post } });
  };
  // console.log(user);

  // const {author, category, createdAt, viewCount, title, content, likeCount} = post
  // const post = getCommunityById(id);
  // console.log(category);

  return (
    <>
      {error && <p>{error}</p>}
      {post && (
        <div className={styles.post}>
          <p className={styles.header}>Community / {post.category}</p>
          <div className={styles.user}>
            <img
              src={post.author?.countryUrl}
              alt=''
              className={styles.country}
            />
            <p className={styles.author}>{post.author?.nickname}</p>
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
      {post && user && user.email === post.author.email && (
        <div>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
      {/* <div>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div> */}
      <form onSubmit={handleSubmit}>
        <textarea
          onChange={handleComment}
          value={comment.content ?? ''}
          name='content'
          cols='80'
          rows='4'></textarea>
        <button>Write</button>
      </form>
      <Comments id={id} />
    </>
  );
}
