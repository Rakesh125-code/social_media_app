import {MoreVert } from '@material-ui/icons'
import React from 'react'
import { useContext } from 'react';
import { useState,useEffect } from 'react'
import {Link,useLocation} from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {format} from 'timeago.js'

import {Comment} from '../../components/comment/Comment';
// import * as timeago from 'timeago.js';
const axios = require('axios');
export const Post = ({post}) => {
    let location=useLocation();
    const PF=process.env.REACT_APP_PUBLIC_FOLDER; //public folder(store images)
    const {user:currentuser}=useContext(AuthContext); //user detail from Authcontext
    const [like, setLike] = useState(post.likes.length); //like or dislike the post
    const [isLiked, setIsLiked] = useState(false); //if already liked then dislike it
    const likeHandler=()=>{ //handle the likes
        try {
            axios.put('/posts/'+post._id+"/like",{userId:currentuser._id}) // update the like in the database by adding user id in likes array
        } catch (error) {
            
        }
        setLike(isLiked?like-1:like+1); //setlike
        setIsLiked(!isLiked); //set islike true or false
    }

    //handle more edit and delete
    // const handleMore=()=>{
    //     try {
    //         axios.delete('/posts'+post._id)
    //     } catch (error) {
            
    //     }
    // }
    useEffect(()=>{
       
        setIsLiked(post.likes.includes(currentuser._id)); //check from database that if user had like the post already or not by checking likes array
        
    },[currentuser._id,post.likes])

    //fetch user details from post{post}
    const [user, setUser] = useState({});
    useEffect(()=>{
        const fetchUser=async()=>{
          const res= await axios.get(`/users?userId=${post.userId}`); //fetch a user using userId (? - means query)
            setUser(res.data);
        }
        fetchUser();
       
      },[post.userId])


     
  return (
    <div className='mx-2 my-4 bg-white shadow-sm shadow-slate-300 rounded-md'>
        {/* post wrapper */}  
        <div className=''>
            {/* top */}
            <div className='flex items-center'>
                {/* left */}
                <div className='flex items-center p-2 w-full'>
                    {/* profile pic */}
                <Link to={`${location.pathname==="/profile/"+user.username?"":"/profile/"+user.username}`}> 
                <img className='h-12 w-12 rounded-full object-cover mr-2 cursor-pointer' src={user.profilePicture?PF+user.profilePicture:PF+"person/noProfile.png" } alt="" /></Link>    
               
                <div className='flex flex-col'>
                    {/* profilename */}
                <span className='font-[700]'>{user.username}</span>
                <span className='text-xs text-slate-500'>{format(post.createdAt)}</span>
                </div>
                </div>

                {/* right */}
                {/* <div onClick={handleMore} className='cursor-pointer'> */}
                    <MoreVert/>
                {/* </div> */}
            </div>

            {/* centre */}
            <div>
                {/*  post text */}
                <p className='p-2 text-[15px]'>{post.desc} </p>
                {/* post image */}
                <img className='w-full max-h-[500px] object-cover ' src={PF+post.img} alt=""  />
            </div>
              

            {/* bottom */}
            <div className='flex items-center justify-between'>
                {/* left */}
                <div className='flex items-center p-1'>
                    <img className='h-8 mx-1 cursor-pointer' src="/assets/like.png" alt="" onClick={likeHandler} />
                    <img className='h-7 mr-1 cursor-pointer' src="/assets/heart.png" alt="" onClick={likeHandler} />
                    {/* like counter */}
                    <span className='mx-1 text-[14px] text-slate-600'>{like} people like it</span>
                </div>

                {/* right */}
                <div className='px-2'>
                    {/* comment text */}
                    {/* <span className='text-slate-600 text-[14px] cursor-pointer'>12 comments</span> */}
                    <div className='flex items-center justify-center'>
                       
                        <div>
                           <Comment /> 
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}
