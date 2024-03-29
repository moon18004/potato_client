import React, { useState } from 'react';
import styles from '../styles/community/postCommunity.module.css';
import { postCommunity } from '../api/community';
import { useNavigate } from 'react-router-dom';
import useCommunity from '../hooks/useCommunity';

export default function PostCommunity() {
  const [post, setPost] = useState({ category: 'QUESTION' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {addPost} = useCommunity();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((po) => ({ ...po, [name]: value }));
    console.log(post);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(post);

    // const res = await postCommunity(post);
    const res = await addPost.mutateAsync({post})
    console.log(res);
    if(res.error){
      setError(res.message)
    }
    else{
      navigate('/community');
    }
  };

  return (
    <section>
      Write
      <form onSubmit={handleSubmit}>
        <label htmlFor=''>Category</label>
        <select
          name='category'
          value={post.category}
          onChange={handleChange}
          id=''>
          <option value='QUESTION'>Question</option>
          <option value='CHITCHAT'>Chit Chat</option>
          <option value='SOCIAL'>Social</option>
          <option value='TIP'>Tip</option>
          <option value='ETC'>Etc</option>
        </select>
        <label htmlFor=''>
          Title:
          <input
            type='text'
            name='title'
            value={post.title ?? ''}
            placeholder='title'
            required
            onChange={handleChange}
          />
        </label>
        <textarea
          className={styles.content}
          onChange={handleChange}
          value={post.content ?? ''}
          name='content'
          rows={5}
          cols={33}></textarea>
        <button>Write</button>
        {error && <p>{Array.isArray(error) ? error[0] : error}</p>}
      </form>
    </section>
  );
}
