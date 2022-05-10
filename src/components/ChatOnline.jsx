import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

export default function ChatOnline({onlineUsers,currentId,setCurrentChat}) {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([])
  const [onlineFriends, setOnlineFriends] = useState([]);
  useEffect(()=>{
    const getFriends=async()=>{
      const res=await axios.get('/users/friends/'+currentId)
      setFriends(res.data);
    }
    getFriends();
  },[currentId])
  
  useEffect(()=>{
    setOnlineFriends(friends.filter((f)=>onlineUsers.includes(f._id)))
  },[friends,onlineUsers])
  const handleClick=async (user)=>{
    try {
      const res = await axios.get(`/conversations/find/${currentId}/${user._id}`);
      setCurrentChat(res.data);
    } catch (error) {
      console.log(error);
    }

  }
  return (
    <>
     {onlineFriends.map(o=> (
        <div className='flex items-center cursor-pointer hover:bg-[#f1f2f3] rounded-full p-2' onClick={()=>handleClick(o)}>
            {/* image profile */}
            <div className='relative'>
              <img className='w-10 h-10 rounded-full object-cover ' src={o?.profilePicture?PF+o.profilePicture:PF+"person/noProfile.png"} alt="" />
              {/* online */}
              <span className='bg-green-500 h-3 w-3 border-2 border-white  rounded-full absolute -top-[3px] -right-[1px]'></span>
              </div>
            {/* username */}
            <span className='ml-2 font-[500]'>{o?.username}</span>
        </div>
        ))}
    </>
  )
}
