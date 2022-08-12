import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {getAllPosts, Post} from '../services/posts'

const PostList = () => {
  const firstRenderRef = useRef<boolean>(true)
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    if(firstRenderRef.current) {
       firstRenderRef.current = false;
       return
    }
    getAllPosts().then((res) => {
       setPosts(res.data)
    })
  }, [])

  return (
    <div>
       {
         posts.map(post => <h1 key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
         </h1>)
       }
    </div>
  )
}

export default PostList