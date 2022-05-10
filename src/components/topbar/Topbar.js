import React from "react";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import {Link,useLocation,useNavigate} from 'react-router-dom';
import { useContext,useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import axios from "axios";
import SerachUserHome from "../SerachUserHome";

export const Topbar = () => {

  let location=useLocation();
  const navigate=useNavigate();
  // 
  // const profileContainer=document.querySelector("#profileContainer");
 
  const {user}=useContext(AuthContext);
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const toggleProfileClassContainer=()=>{
    // const profileContainer=document.querySelector("#profileContainer");
    const profilePicCont=document.getElementById("profilePicCont");
    const profileContainer=document.getElementById("profileContainer");
    if(profileContainer.classList.contains("hidden")){
      profileContainer.classList.remove("hidden");
     profileContainer.classList.add("block");

     profilePicCont.classList.remove("bg-fbBlue")
     profilePicCont.classList.add("bg-white")
     profilePicCont.classList.remove("text-white")
     profilePicCont.classList.add("text-black")
     profilePicCont.classList.remove("rounded-3xl")
     profilePicCont.classList.add("rounded-t-3xl")
    }
    else{
      profileContainer.classList.remove("block");
      profileContainer.classList.add("hidden");

      profilePicCont.classList.remove("bg-white")
      profilePicCont.classList.add("bg-fbBlue")
      profilePicCont.classList.remove("text-black")
      profilePicCont.classList.add("text-white")
      profilePicCont.classList.remove("rounded-t-3xl")
      profilePicCont.classList.add("rounded-3xl")
    }
    
  }
  const handleLogout=()=>{
    localStorage.removeItem('user');
    window.location.reload();
    // navigate('/login');
    
  }
  //serach friends
const [query,setQuery] =useState("");
const [searchUserName,setSearchUserName]=useState();
useEffect(()=>{
  if(query.length===0){
    const searchUsersContainer=document.getElementById("searchUsersContainer");
    searchUsersContainer.classList.add("hidden");
    searchUsersContainer.classList.remove("block");
  }
  if( /\S/.test(query)){
    const searchUsersContainer=document.getElementById("searchUsersContainer");
    if(searchUsersContainer.classList.contains("hidden")){
      searchUsersContainer.classList.remove("hidden");
      searchUsersContainer.classList.add("block");
    }
  };
},[query])

useEffect(()=>{
  const getAllUsers=async ()=>{
    const res= await axios.get('/users/fetch/all/users')
    setSearchUserName(res.data);
  }
  getAllUsers();
},[query])
  return (
    <>
      <div className="flex items-center justify-around bg-fbBlue sticky top-0 h-12 z-10">
        {/* topleft */}
        <div className="flex">
          <Link to='/'>
          <span className="font-bold text-[22px] text-white cursor-pointer">SnapShare</span>
          </Link>
        </div>

        {/* topmiddle */}
        <div className="flex bg-white w-1/3 h-10 rounded-3xl items-center relative">
          <div className="ml-2 w-full">
            <Search className="cursor-pointer scale-90  text-slate-700"/>
            <input
              type="text"
              placeholder="Search for friend, post or video"
              className=" py-1 px-1 outline-none text-slate-700  w-4/5"
              onChange={(e)=>{setQuery(e.target.value)}}
                value={query}
               
            />
          </div>
         
            {/* users search */}
          <div id="searchUsersContainer" className="absolute border rounded-b-3xl border-fbBlue  w-full top-[44px] bg-fbBlue text-white hidden">
            <ul  className="py-1 px-3 flex flex-col">
            {searchUserName?.map((u)=>(
                <SerachUserHome key={u._id} u={u} query={query}/>
            ))}
            </ul>
          </div>
        </div>


        {/* topright */}
        <div className="flex justify-between items-center w-1/3 text-white">

          {/* topbarlinks */}
          <div className="flex items-center">
           <Link to="/"> <span className="mr-1 cursor-pointer text-[15px] font-[500] hover:bg-sky-600 z-1 px-2 py-2 rounded-3xl">HomePage</span></Link>
            <span className="ml-2 cursor-pointer text-[15px] font-[500] hover:bg-sky-600 z-1 px-2 py-2 rounded-3xl">Timeline</span>
          </div>

            {/* profile picture top bar */}
            
            {/* <Link to={`/profile/${user.username}`}> */}

          <div className=" relative" >
            <div id="profilePicCont"  className="bg-fbBlue flex text-white items-center  z-1 px-1 py-1 cursor-pointer hover:text-white  rounded-3xl hover:bg-sky-600" onClick={toggleProfileClassContainer}>
          <img className="h-9 w-9 object-cover rounded-full " src={user.profilePicture?PF+user.profilePicture:PF+"person/noProfile.png"} alt="" />
          <h2 className="text-[13px] font-[400] mx-2">{user.username}</h2>
          </div>

          <div id="profileContainer" className=" hidden absolute bg-white text-black w-full top-[44px] rounded-b-3xl">
            <ul className=" w-full text-center text-xs">
            <Link to={`${location.pathname==="/profile/"+user.username?"":"profile/"+user.username}`}> 
            <li className="hover:bg-slate-200 p-3 hover:cursor-pointer cursor-default" 
            // onClick={()=>{
            //   // window.location.href='http://localhost:3000/profile/'+user.username
            //   navigate('profile/'+user.username)}}
              >Profile</li>
            </Link>
              <Link to='/login'><li className="hover:bg-slate-200 pb-3 pt-2 hover:cursor-pointer cursor-default rounded-b-3xl" onClick={handleLogout}>Logout</li></Link>
              </ul>
              </div>

          </div>

          {/* </Link> */}

          {/* topbarIcons */}
          <div className="flex items-center">
            {/* topbarIconItem */}
            <div className="relative mx-1">
              <Person className="cursor-pointer"/>
              {/* topbarIconBadge */}
              <span className="bg-red-500 text-xs h-4 w-4 absolute rounded-lg -top-1.5 -right-1 flex items-center justify-center">1</span>
            </div>
            {/* topbarIconItem */}
            <Link to='/messenger'>
            <div className="relative mx-2">
              <Chat className="cursor-pointer"/>
              {/* topbarIconBadge */}
              <span className="bg-red-500 text-xs h-4 w-4 absolute rounded-lg -top-1.5 -right-1 flex items-center justify-center">2</span>
            </div>
            </Link>

            {/* topbarIconItem */}
            <div className="relative mx-1">
              <Notifications className="cursor-pointer"/>
              {/* topbarIconBadge */}
              <span className="bg-red-500 text-xs h-4 w-4 absolute rounded-lg -top-1.5 -right-1 flex items-center justify-center">1</span>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};
