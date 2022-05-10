import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

export default function Conversations({conversation,currentUser}) {
  const [user, setUser] = useState(null); 
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const friendId=conversation.members.find((m)=> m !== currentUser._id);
    const getUser=async()=>{
      try {
        const res = await axios('/users?userId='+friendId);
        setUser(res.data);
     
      } catch (error) {
        
      }
    }
  getUser();
    
  }, [currentUser,conversation])
  

  return (
    <>
    <div className='flex items-center hover:bg-[#f1f2f3] rounded-full  ml-2 cursor-pointer'>
        <img className='h-[40px] w-[40px] rounded-full object-cover mr-[18px] m-4' 
        src={user?.profilePicture ? PF+user.profilePicture : PF+'person/noProfile.png'} 
        alt="" />
        <span className='text-black font-[500]'>{user?.username}</span>
    </div>
    </>
  )
}
