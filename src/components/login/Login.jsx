import React from 'react'
import { useContext } from 'react';
import { useRef } from 'react';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
export default function Login() {
    const email=useRef();
    const password=useRef();
    const {user,isFetching,error,dispatch}=useContext(AuthContext)
    const handleClick=(e)=>{
        e.preventDefault();
        loginCall({email:email.current.value,password:password.current.value},dispatch);
        
    }
    // console.log(user);
  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
        <div className='w-[70%] h-[70%] flex'>
            {/* left */}
            <div className='w-1/2 flex flex-col justify-center mr-8'>
                <h3 className='font-[900] text-fbBlue text-[50px] mb-[10px]'>SnapShare</h3>
                <span className='text-[24px]'>
                    Connect with friends and the world around you on SnapShare
                </span>
            </div>
                
            {/* right */}
            <div className='w-1/2 flex flex-col justify-center'>
                {/* login box */}
                <form className='h-[350px] p-[20px] rounded-xl flex flex-col justify-between' 
                // onSubmit={handleClick}
                >
                    <input className='outline-none h-[50px] rounded-lg border-[1px] border-gray-500 text-[18px] px-3' placeholder='Email' type="email" ref={email} required/>
                    <input className='outline-none h-[50px] rounded-lg border-[1px] border-gray-500 text-[18px] px-3' placeholder='Password' type="password" name="" id=""  ref={password} required minLength={6}/>

                    <button className={`h-[50px] rounded-xl border-[1px] border-gray-500 bg-fbBlue text-white text-[20px] ${isFetching ?"cursor-not-allowed":""}`}
                    disabled={isFetching} type="submit" onClick={handleClick}>{isFetching?<CircularProgress color="inherit" size="30px"/>:"Log In"}</button>

                    <span className='cursor-pointer text-center text-fbBlue'>Forgot Password?</span>
                    <div className='flex justify-center'>
                    <Link to='/register'>
                        <button className='h-[50px] rounded-xl border-[1px] border-gray-500 bg-[#42b72a] text-white text-[20px] px-4 w-[100%]'>{isFetching?<CircularProgress color="inherit" size="30px"/>:"Create a New Account"}</button>
                        </Link>
                        </div>
                </form>
            </div>
        </div>
    </div>
  )
}
