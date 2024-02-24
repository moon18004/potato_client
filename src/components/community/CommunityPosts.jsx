import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import useCommunity from '../../hooks/useCommunity';
import CategorySlider from './Slider';
import { Link } from 'react-router-dom';
import CommunityPost from './CommunityPost';
import Category from './Category';
import styles from '../../styles/community/communityPosts.module.css';
import { useAuthContext } from '../../context/AuthContext';
import { FaPen } from "react-icons/fa";

export default function CommunityPosts() {
  const { user, verified, setVerified } = useOutletContext();
  const {
    communityQuery: { isLoading, error, data: posts },
    crucialsQuery: { data: crucials },
  } = useCommunity();
  const [activeTab, setActiveTab] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [populars, setPopulars] = useState([]);

  // const { user } = useAuthContext();
  // console.log('user');

  const handleCategory = (cat) => {
    setActiveTab(cat.id);

    setFiltered(posts.filter((item) => item.category === cat.name));
  };

  const categories = [
    { id: 0, name: 'ALL', content: 'All' },
    { id: 1, name: 'QUESTION', content: 'Question' },
    { id: 2, name: 'CHITCHAT', content: 'Chitchat' },
    { id: 3, name: 'SOCIAL', content: 'Social' },
    { id: 4, name: 'TIP', content: 'Tip' },
    { id: 5, name: 'ETC', content: 'Etc' },
  ];

  console.log(crucials);
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      
      {/* <ul>
        {categories.map((category, index) => {
          return (
            <Category
              key={category.id}
              category={category}
              callback={handleCategory}
              selected={activeTab}
            />
          );
        })}
      </ul> */}
      <div className={styles.slider}>
        <CategorySlider
        className={styles.slider}
          categories={categories}
          callback={handleCategory}
          selected={activeTab}>
          
        </CategorySlider>
      </div>
      {verified && <Link className={styles.write} to='/community/post'><FaPen className={styles.pen}/>Write</Link>}
      <ul>
        {crucials &&
          crucials.map((post) => {
            return <CommunityPost key={post.id} post={post} />;
          })}
      </ul>
      <ul>
        {posts &&
          activeTab === 0 &&
          // populars.map((post) => {
          //   return <CommunityPost key={post.id} post={post} user={user} />;
          // })
          posts.map((post) => {
            return <CommunityPost key={post.id} post={post} />;
          })}
        {posts &&
          activeTab !== 0 &&
          filtered.map((post) => {
            return <CommunityPost key={post.id} post={post} />;
          })}
      </ul>
    </>
  );
}
