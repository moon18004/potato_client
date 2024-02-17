import React from 'react';
import CommunityPosts from '../components/CommunityPosts';
import { useOutletContext } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function Community() {
	const {verified, setVerified} = useOutletContext();
	// console.log(verified);

	return (
		<>
		<Link to='/community/post'>Write</Link>
		<div>
			<CommunityPosts/>
		</div>
		</>
		
	);
}

