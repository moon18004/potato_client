import React from 'react';
import { useOutletContext } from "react-router-dom";
import useCommunity from '../hooks/useCommunity';
import CommunityPost from './CommunityPost';

export default function CommunityPosts() {
	
	const {communityQuery:{isLoading, error, data:posts}} = useCommunity();
	console.log(posts);
	return (
		<>
			{isLoading && <p>Loading...</p> }
			{error && <p>{error}</p> }
			<ul>
				{posts &&
					posts.map((post)=>{
						return <CommunityPost key={post.id} post={post}/>
					})
				}
			</ul>
		</>
	);
}

