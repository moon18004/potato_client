import React from 'react';
import CommunityPosts from '../../components/community/CommunityPosts';
import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from '../../styles/community/community.module.css';

export default function Community() {
  const { user, verified, setVerified } = useOutletContext();
  // console.log(user)
  // console.log(verified);

  return (
    <>
      {/* {verified && <Link to='/community/post'>Write</Link>} */}
      <div className={styles.community}>{<CommunityPosts />}</div>
    </>
  );
}
