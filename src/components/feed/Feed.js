import React ,{useState} from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Post } from '../post/Post'
import Share from '../share/Share'
const axios = require('axios');
export const Feed = ({username}) => {


  const {user}=useContext(AuthContext);
  //post
  const [posts, setPosts] = useState([]);
  //fetch timeline post
  useEffect(()=>{
  
    const fetchPosts=async()=>{
      const res=username? await axios.get('/posts/profile/'+username) : await axios.get('posts/timeline/'+user._id);
        setPosts(res.data.sort((p1,p2)=>{
          return new Date(p2.createdAt) - new Date(p1.createdAt) //sort posts
        }));
    }
     fetchPosts();
    
  },[username,user._id])
  return (
    <>
    <div className=' w-[60%] scrollbar scrollbar-hidden h-[calc(100vh-48px)]'>
      <div className=''></div>
     {(!username||username===user.username)&& <Share/>}
      {posts.map((p)=>(
          <Post key={p._id} post={p}/>
        ))}
    </div>
    </>
  )
}
