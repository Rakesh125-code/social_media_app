import { PermMedia,Label,Room,EmojiEmotions, Cancel } from '@material-ui/icons'
import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
export default function Share() {
    //auth user
//     const [user,setUser]=useState({_id: '621778e2b9682072b55263a9', username: 'r1', email: 'r1@gmail.com', password: '$2b$10$jwD9slcnc8o.mEtb3bhSSusSqDeBzuY7uzlWeFwIriS.gSQE5q/Iy', profilePicture: '/person/noProfile.png'});
//   const {authuser}=useContext(AuthContext);
//   useEffect(()=>{
//     console.log(authuser)
//     const getCurrentUser=async()=>{
//         try {
//             const res=await axios.get('/auth',{
//                 headers: {
//                     "Content-Type": "application/json",
//                     "auth-token":authuser,
//                   }
                  
//             })
//             setUser(res.data);
//             console.log(res.data)
//             console.log("hello")
//         } catch (error) {
//             console.log(error);
//         }
        
//     }
//     getCurrentUser();
// },[])
  

    const {user}=useContext(AuthContext);
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const desc=useRef(); //ref to description input
    const [file, setFile] = useState(null);
    const submitHandler=async(e)=>{
        e.preventDefault();
        const newPost={
            userId:user._id,
            desc:desc.current.value //value store in desc.current.value using useref
        }
        ///handle file image and set new name using date
        if(file){
            const data=new FormData();
            const fileName = Date.now()+file.name;
            data.append('name',fileName);
            data.append('file',file);
            newPost.img=fileName;
            console.log(newPost);
            try {
                await axios.post('/upload',data);
            } catch (error) {
               
            }
        }
        try {
            await axios.post('/posts',newPost); //post the post
            window.location.reload();
        } catch (error) {
            
        }
    }
  return (
    //   share
    <div className='mx-2 my-4 bg-white shadow-sm shadow-slate-400 rounded-md '>
        {/* sharewrapper */}
        <div className='p-2'>

            {/* share top */}
            <div className='flex items-center w-full'>
                {/* profilepic */}
                <img className='h-12 w-12 rounded-full object-cover mr-3' src={user.profilePicture?PF+user.profilePicture:PF+"person/noProfile.png" }  alt="" />
                <input className='outline-none w-full text-gray-700' placeholder={`What's in your mind ${user.username}?`} ref={desc} />
            </div>
            <hr className='m-2'/>
            {file && (<div className='relative'>
                <img src={URL.createObjectURL(file)} alt="" /> 
                <Cancel className='absolute top-0 right-0 m-1 cursor-pointer text-[#e72c2c] bg-white rounded-full opacity-70'  onClick={()=>{
                    setFile(null);
                }}/></div>)}
            {/* share button */}
            <form className='flex  justify-center items-center' onSubmit={submitHandler}>
                {/* shareoptions */}
                <div className='flex b justify-evenly w-full py-2'>
                    {/* shareoption */}
                    <label htmlFor='file' className='cursor-pointer hover:bg-slate-100 z-1 px-2 py-2 rounded-3xl'>
                        {/* icon */}
                        <PermMedia htmlColor='tomato' className=''/>
                        {/* text */}
                        <span className='text-[13px] ml-2'>Photo or Video</span>
                        <input className='hidden' type="file" id="file" accept='.png,.jpeg,.jpg' onChange={(e)=>setFile(e.target.files[0])} />
                    </label>
                    <div className='cursor-pointer hover:bg-slate-100 z-1 px-2 py-2 rounded-3xl'>
                        {/* icon */}
                        <Label htmlColor='blue' className=''/>
                        {/* text */}
                        <span className='text-[13px] ml-2'>Tag</span>
                    </div>
                    <div className='cursor-pointer hover:bg-slate-100 z-1 px-2 py-2 rounded-3xl'>
                        {/* icon */}
                        <Room htmlColor='green' className=''/>
                        {/* text */}
                        <span className='text-[13px] ml-2'>Location</span>
                    </div>
                    <div  className='cursor-pointer hover:bg-slate-100 z-1 px-2 py-2 rounded-3xl'>
                        {/* icon */}
                        <EmojiEmotions htmlColor='goldenrod' className=''/>
                        {/* text */}
                        <span className='text-[13px] ml-2'>Feelings</span>
                    </div>
                </div>
                {/* sharebutton */}
                <button className='bg-green-600 my-3 mr-6 px-3 text-white font-[500] rounded-3xl' type='submit'>Share</button>
            </form>
        </div>
    </div>
  )
}
