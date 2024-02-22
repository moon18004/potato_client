import React from 'react';
import SelectBar from '../components/course/SelectBar';
import PostButton from '../components/course/PostButton';
import { useOutletContext } from 'react-router-dom';
import Post from '../components/course/Post';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Link } from 'react-router-dom';

import styles from '../styles/course.module.css'

export default function Course() {
	
	return (
		<div className='course'>
			Course
			<div>
				<SelectBar></SelectBar>
				<Post></Post>
				<Link to='/'>
					<AddCircleRoundedIcon className={styles.add}/>
				</Link>
			</div>
		</div>
	);
}
