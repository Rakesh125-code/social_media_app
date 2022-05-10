import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { Feed } from "../../components/feed/Feed";
import { Leftbar } from "../../components/leftbar/Leftbar";
import { Rightbar } from "../../components/rightbar/Rightbar";
import { Topbar } from "../../components/topbar/Topbar";
const axios = require('axios');
export default function Profile() {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const params=useParams();
  //fech a user
  useEffect(()=>{
    console.log("first")
      const fetchUser=async()=>{
        const res= await axios.get(`/users?username=${params.username}`) //post s username aaya hai as paramas
          setUser(res.data);
          console.log(res);
          
      }
     fetchUser();
     console.log("object");
    },[params.username])
  return (
    <>
      <Topbar />
      <div className="flex justify-between w-full">
          <Leftbar/>

        {/* right */}
        <div className="w-[75%]">
          {/* rightTop */}
          <div>
              {/* profile cover */}
              <div className="relative">
                  {/* cover image */}
              <img className="w-full h-[350px] object-cover" src={user.coverPicture?PF+user.coverPicture : PF+'person/noCover.jpg'} alt="" />
              {/* user img */}
              <img className="w-[150px] h-[150px] object-cover absolute rounded-full left-0 right-0 m-auto top-[265px] border-2 border-white" src={user.profilePicture?PF+user.profilePicture : PF+'person/noProfile.png'}  alt="" />
              </div>
              {/* profile info */}
              <div className="flex flex-col items-center mt-16">
                  {/* name */}
                  <h4 className="font-bold text-2xl">{user.username}</h4>
                  {/* desc */}
                  <span className="font-[300] m-2">{user.desc}</span>
              </div>
          </div>
          {/* right bottom */}
          <div className="flex justify-around">
              <Feed username={params.username}/>
              <Rightbar user={user} />
           </div>
        </div>

      </div>
    </>
  );
}
