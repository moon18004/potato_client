import React from 'react';
import SelectBar from '../../components/course/SelectBar';
import { useOutletContext } from 'react-router-dom';
import Post from '../../components/course/Post';
import PostList from '../../components/course/PostList';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Link } from 'react-router-dom';

import styles from '../../styles/course.module.css'

export default function Course() {
	
	return (
		<div className='course'>
			Course
			<div>
				{/* <SelectBar></SelectBar> */}
				<PostList></PostList>
				<Link to='/course/post'>
					<AddCircleRoundedIcon className={styles.add}/>
				</Link>
			</div>
		</div>
	);
}
