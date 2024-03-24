import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useCommunity from '../../hooks/useCommunity';

export default function CommunityEdit() {
  const {
    state: { post },
  } = useLocation();
  const [ePost, setEPost] = useState({
    category: post.category,
    title: post.title,
    content: post.content,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { updatePost } = useCommunity();
  console.log(ePost);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEPost((po) => ({ ...po, [name]: value }));
    console.log(ePost);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(post);

    // const res = await postCommunity(post);
    const res = await updatePost.mutateAsync({ id: post.id, ePost });
    console.log(res);
    if (res.error) {
      setError(res.message);
    } else {
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
          value={ePost.category}
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
            value={ePost.title ?? ''}
            placeholder='title'
            required
            onChange={handleChange}
          />
        </label>
        <textarea
          // className={styles.content}
          onChange={handleChange}
          value={ePost.content ?? ''}
          name='content'
          rows={5}
          cols={33}></textarea>
        <button>Write</button>
        {error && <p>{Array.isArray(error) ? error[0] : error}</p>}
      </form>
    </section>
  );
}
