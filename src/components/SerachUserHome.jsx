import React from 'react'
import { useNavigate } from 'react-router-dom';
export default function SerachUserHome({u,query}) {
    const navigate=useNavigate();
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  return (
      <>
      {(u.username.toLowerCase().includes(query)&&query.length!==0)?
      ( <div><div className="flex items-center p-[5px] rounded-full cursor-default hover:bg-sky-600 hover:cursor-pointer"
      onClick={()=> navigate("profile/"+u.username)}>
      <img className=" h-10 w-10 object-cover rounded-full border border-white" src={u.profilePicture?PF+u.profilePicture:PF+"person/noProfile.png"} alt="" />
    <span className="ml-2">{u.username}</span>
      </div></div>):""}
   
    </>
  )
}
