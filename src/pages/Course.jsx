import React from 'react';

import SelectBar from '../components/course/SelectBar';
import NavBar from '../components/course/NavBar';
import PostButton from '../components/course/PostButton';
import PostBar from '../components/course/PostBar';
import { useOutletContext } from 'react-router-dom';

export default function Course() {
	
	return (
		<div className='course'>
			Course
			<div>
				<SelectBar></SelectBar>
				<p>name</p>
				<p>name</p>
				<h1>abcd</h1>
				<h2>h2</h2>
				<h3>h3</h3>
				<h4>h4</h4>
				<div>div</div>
				<PostBar></PostBar>
				<PostButton></PostButton>
				<NavBar></NavBar>
			</div>
		</div>
	);
}
