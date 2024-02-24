import React from "react";
import Post from "./Post";
import useCourse from "../../hooks/useCourse";
function PostList(){
  const {courseQuery:{isLoading, error, data:posts}} = useCourse();

  console.log(posts);
  return(
    <>
      {isLoading && <h1>Loading</h1>}
      {error && <h1>Error</h1>}
      {posts &&
        posts.map((post)=>{
          return (
            <>
              {console.log("course test")}
              <Post key={post.id} post={post} />
            </>
          )
        })
      }
    </>
  )
}

export default PostList;