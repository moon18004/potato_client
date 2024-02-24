/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/community/communityPost.module.css';
import { useAuthContext } from '../../context/AuthContext';
import Dropdown from './Dropdown';
import { useState } from 'react';
import useCommunity from '../../hooks/useCommunity';
import { format } from 'timeago.js';
import { GrView } from 'react-icons/gr';
import { FaRegCommentDots, FaRegBookmark } from 'react-icons/fa';
import { AiOutlineLike } from 'react-icons/ai';
import { GiCampfire } from 'react-icons/gi';
import { TbMessage2Heart } from 'react-icons/tb';

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
    id,
    type,
  },
}) {
  const navigate = useNavigate();
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const { deletePost, uptateType } = useCommunity();
  const { user } = useAuthContext();
  const handleDelete = async () => {
    const ans = confirm('Are you sure to delte this post?');
    if (ans) {
      const res = await deletePost.mutateAsync(post.id);
      console.log(res);
    }
  };
  const handleType = async (type) => {
    console.log(type);
    const res = await uptateType.mutateAsync({ id: post.id, type });
    setDropdownVisibility(!dropdownVisibility);
    console.log(res);
  };
  // console.log(post);
  // console.log(user);
  return (
    <li className={styles.postContainer}>
      {user?.role === 'ADMIN' ? (
        <div className={styles.dropdown}>
          <button
            className={styles.dropdownBtn}
            onClick={(e) => setDropdownVisibility(!dropdownVisibility)}>
            {dropdownVisibility ? 'Close' : 'Open'}
          </button>
          <Dropdown visibility={dropdownVisibility}>
            <ul>
              <li
                onClick={() => {
                  handleType('POPULAR');
                }}
                className={styles.option}>
                Edit to Popular
              </li>
              <li
                onClick={() => {
                  handleType('ANN');
                }}
                className={styles.option}>
                Edit to Announcement
              </li>
              <li
                onClick={() => {
                  handleType('COMMON');
                }}
                className={styles.option}>
                Edit to Common
              </li>
              <li onClick={handleDelete} className={styles.option}>
                Delete
              </li>
            </ul>
          </Dropdown>
        </div>
      ) : (
        <></>
      )}
      <div className={styles.postBox}>
        <div className={styles.userInfo}>
          <div className={styles.user}>
            <img src={author.countryUrl} alt='' className={styles.country} />
            <p className={styles.author}>{author.nickname}</p>
          </div>
          <p className={styles.createdAt}>{format(createdAt)}</p>
        </div>
        <h3
          className={styles.title}
          onClick={() => {
            navigate(`/communityPost/${id}`);
          }}>
          {title}
        </h3>
        <div className={styles.info}>
          <div>
            {type === 'POPULAR' && <TbMessage2Heart className={styles.fire} />}
            <p
              className={`${styles.category} ${
                type === 'ANN' ? styles.ann : styles.norm
              }`}>
              {type === 'ANN' ? 'Announcement' : category}
            </p>
          </div>

          <div>
            <div className={styles.counts}>
              <GrView className={styles.icons} />
              <p className={styles.views}>{viewCount}</p>
            </div>
            <div className={styles.counts}>
              <FaRegCommentDots className={styles.icons} />
              <p className={styles.comments}>{commentCount}</p>
            </div>
            <div className={styles.counts}>
              <AiOutlineLike className={styles.icons} />
              <p className={styles.likes}>{likeCount}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
