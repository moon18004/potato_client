import React, {useState} from 'react';
import SelectBar from '../../components/course/SelectBar';
import { useOutletContext } from 'react-router-dom';
import Post from '../../components/course/Post';
import PostList from '../../components/course/PostList';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Link } from 'react-router-dom';
import { SubjectCategory } from '../../components/course/SubjectCategory';

import styles from '../../styles/course/course.module.css'

export default function Course() {
	const [subjectValue, setSubjectValue] = useState('');
	const handleSubject = (e) => {
    setSubjectValue(e.target.value);
  }
	const subjectData = SubjectCategory();
	return (
		<div>
			<h1>Course</h1>
			<hr />
			<div className={styles.course}>
				<div className={styles.bar}>
				<SelectBar 
            label="select an option"
            value={subjectValue}
            onChange={handleSubject}
            options={subjectData}
        />
				</div>
				
				<PostList></PostList>
				<Link to='/course/post'>
					<AddCircleRoundedIcon style={{fontSize: '50px'}} className={styles.add}/>
				</Link>
			</div>
		</div>
	);
}
