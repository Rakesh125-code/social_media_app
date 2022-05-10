import React from 'react'
import { Add, Remove } from '@material-ui/icons';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Online from '../online/Online'
const axios = require('axios');
export const Rightbar = ({user}) => { //user from profile page
 
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const {user:currentUser,dispatch} =useContext(AuthContext);
 
  const [friends, setFriends] = useState([]);
  let f=currentUser.followings.includes(user?._id);
  // const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));
  useEffect(() => {
    // console.log(currentUser.followings.includes(user?._id));
    // console.log(f)

    const getFriends = async()=>{
      try {
        const friendList = await axios.get('/users/friends/'+user?._id);
        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }
    }
    getFriends();
   
  }, [user])


  const handleClick =async()=>{
      try {
          if(f){
            await axios.put('/users/'+user._id+"/unfollow",{userId:currentUser._id})
            dispatch({type:"UNFOLLOW",payload:user._id})
          }
          else{
            await axios.put('/users/'+user._id+"/follow",{userId:currentUser._id})
            dispatch({type:"FOLLOW",payload:user._id})
            handleStartNewConversation();
          }
          // setFollowed(!followed);
          // console.log('heelloo')
          f=!f;
      } catch (error) {
        console.log(error);
      }
      
  }
  const handleStartNewConversation=async ()=>{
    const ids={
        senderId:currentUser._id,
        receiverId:user._id
    }
    try {
      await axios.post('/conversations',ids);
    } catch (error) {
      console.log(error);
    }
  }

  // const [isConv, setIsConv] = useState(null);
  // useEffect(()=>{
  //   const isConvFunc=async()=>{
  //     const ids={
  //       senderId:currentUser._id,
  //       receiverId:user._id
  //   }
  //     try {
  //       const res = await axios.get(`/conversations`,ids);
  //       setIsConv(res);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   isConvFunc();
  //   console.log(isConv);
  // },[user._id])

  const HomeRightbar=()=>{
    return(
      <>

      {/* rightbar */}
    <div className='w-1/4 h-[calc(100vh-48px)] scrollbar scrollbar-hidden'>
      {/* rightwrapper */}
      <div className='pr-4 pt-6 flex flex-col items-center'>
      {/* birthdaycontainer */}
      <div className='flex items-center'>
          <img className='h-10' src="/assets/gift.png" alt="" />
          <span className='text-[14px] ml-2'><b className='cursor-pointer'>Sanju</b> and <b className='cursor-pointer'>5 other friends</b> have a birthday today</span>
        </div>
        {/* addvertisement */}
        <img className='w-full rounded-lg ml-3 mt-4' src="/assets/post/4.jpg" alt="" />
        <div className='flex float-left w-full'>
        <h3 className='mx-3 mt-2 font-bold'>Online Friends</h3>
        </div>
        {/* online friend list */}
        <ul className='w-full float-left ml-6'>
          {/* map */}
        <Online/>
        </ul>
        </div>
    </div>
      </>
    )
  }
  // console.log(user);
  const ProfileRightbar=()=>{
    
    // 
    return(
      <>
      
      {/* rightbar */}
    <div className='w-1/4 h-[calc(100vh-48px)] scrollbar scrollbar-hidden'>
      {/* rightwrapper */}
      <div className='pt-6 flex flex-col'>

      {/* follow button */}
      {user.username!==currentUser.username && (
        <div className='flex justify-around'>
        <button className=' bg-fbBlue text-white w-[40%] hover:bg-sky-600 py-1 mb-4 rounded-full flex justify-center font-[500]' onClick={handleClick}>
          {f?"Unfollow":"Follow"}
          {f?<Remove className='scale-90'/>:<Add className='scale-90'/>}
        </button>
        {/* message button */}
        <button className='w-[40%] py-1 mb-4  px-2 rounded-full bg-fbBlue hover:bg-sky-600 text-white' onClick={handleStartNewConversation}>
        Add to chat
          </button>
        </div>
      )}

      {/* right bar title */}
      <h4 className='mb-1'><b>User information</b></h4>
      {/* rightbar */}
      <div className='flex flex-col text-[15px]'>

      <div className='bg-fbBlue py-2 pl-3 pr-1 rounded-full text-white w-min'>
          <span className=' mr-[12px] font-[500]'>Followers:</span>
          <span className='text-fbBlue bg-white border-[2px] rounded-full py-1 px-2 font-[400]'>{user.followers?.length}</span>
        </div>

        <div className='my-2 bg-fbBlue py-2 pl-3 pr-1 rounded-full text-white w-min'>
          <span className=' mr-[12px] font-[500]'>Followings:</span>
          <span className='text-fbBlue bg-white border-[2px] rounded-full py-1 px-2 font-[400]'>{user.followings?.length}</span>
        </div>
        
        <button className='flex font-[500] bg-slate-100 w-min px-2 py-1'>More</button>

        {/* item */}
        <div className=''>
          {/* key */}
          <span className='text-[#555] mr-[15px] font-[500]'>City:</span>
          {/* value */}
          <span className='font-[300]'>{user.city}</span>
        </div>
        <div className=''>
          <span className='text-[#555] mr-[15px] font-[500]'>State:</span>
          <span className='font-[300]'>{user.state}</span>
        </div>

        <div className=''>
          <span className='text-[#555] mr-[15px] font-[500]'>Relationship:</span>
          <span className='font-[300]'>{user.relationship===1?'Single':user.relationship===2?'Married':""}</span>
        </div>
      </div>
      <h4 className='mt-4'><b>Followings</b></h4>
      {/* folllowings */}
      <div className='flex flex-wrap justify-between'>
        {/* following */}
        {friends.map((friend)=>(
          <Link key={friend._id} to={'/profile/'+friend.username}>
          <div  className='flex flex-col items-center my-2 cursor-pointer'>
          <img className='mr-2 h-[85px] w-[85px] rounded-md object-cover' src={friend.profilePicture?PF+friend.profilePicture:PF+"person/noProfile.png"} alt="" />
          <span>{friend.username}</span>
        </div></Link>
        ))}
        
        
      </div>
      </div>
    </div>
      </>
    )
  }
  return (
    <>
        {user? <ProfileRightbar/>:<HomeRightbar/>}
    </>
  )
}
