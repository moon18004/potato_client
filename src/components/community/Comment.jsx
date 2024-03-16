import React, { useState } from 'react';
import { format } from 'timeago.js';
import { AiOutlineLike } from 'react-icons/ai';
import styles from '../../styles/community/communityComments.module.css';
import { useOutletContext } from 'react-router-dom';
import useCommunityComments from '../../hooks/useCommunityComments';

export default function Comment({ comment, postId }) {
  const { author, createdAt, content, likeCount, id } = comment;
  const { user, verified, setVerified } = useOutletContext();
  const { deleteComment, updateComment } = useCommunityComments(postId);
  const [isEdit, setIsEdit] = useState(false);
	const [ eComment, setEComment] = useState({content: content});
	// console.log(user);

	const handleChange = async (e) =>{
		
		const { name, value } = e.target;
		console.log(eComment);
		
		setEComment({ [name]: value });
		
	}
	const handleEditSubmit = async (e) =>{
		e.preventDefault();
		const res = await updateComment.mutateAsync({id, eComment});
		console.log(res);
		if(res.error){
			alert(res.message);
		}
		else{
			console.log('edited');
			setIsEdit(false);
		}

	}

  const handleEdit = async (e) => {
    e.preventDefault();
    setIsEdit(true);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const ans = confirm('Do you want to delete this comment?');
    if (ans) {
      const res = await deleteComment.mutateAsync(id);
      if (res.error) {
        alert(res.message);
      }
    }
  };

  return (
    <>
      <li>
        <div className={styles.top}>
          <div className={styles.author}>
            <img className={styles.country} src={author.countryUrl} alt='' />
            <p>{author.nickname}</p>
          </div>
          <div className={styles.data}>
            <p>{format(createdAt)}</p>
            <AiOutlineLike />
            <p>{likeCount}</p>
          </div>
        </div>
        {isEdit === false && (
          <div>
            <p>{content}</p>
          </div>
        )}
        {isEdit && (
          <>
            <textarea value={eComment.content} name='content' onChange={handleChange}></textarea>
						<button onClick={handleEditSubmit} >Edit</button>
          </>
        )}
        {user && user.email === author.email && isEdit === false && (
          <div>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </li>
      {}
    </>
  );
}
