import axios from 'axios';
import React from 'react'
import { useRef } from 'react'
import { useNavigate ,Link} from 'react-router-dom';

export default function Register() {
    const username=useRef();
    const email=useRef();
    const password=useRef();
    const confirmPassword=useRef();
    const navigate=useNavigate();
    const handleClick= async (e)=>{
        e.preventDefault();
        if(confirmPassword.current.value!==password.current.value){
            password.current.setCustomValidity("Password don't match")
        }
        else{
            //create user
            const user={
                username:username.current.value,
                email:email.current.value,
                password:password.current.value
            }
            try {
                //save user
                await axios.post('auth/register',user);
            //    const res=await axios.post('auth/register',user);
               //and redirect to login page
            //    localStorage.setItem('token',res.data.authtoken);
                navigate("/login");
            } catch (error) {
                
            }
        }
    }
  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center'>
        <div className='w-[70%] h-[70%] flex'>
            {/* left */}
            <div className='w-1/2 flex flex-col justify-center'>
                <h3 className='font-[900] text-fbBlue text-[50px] mb-[10px]'>SnapShare</h3>
                <span className='text-[24px]'>
                    Connect with friends and the world around you on SnapShare
                </span>
            </div>
                
            {/* right */}
            <div className='w-1/2 flex flex-col justify-center'>
                {/* login box */}
                <form className='h-[420px] p-[20px] rounded-xl flex flex-col justify-between' onSubmit={handleClick}>
                    <input className='outline-none h-[50px] rounded-lg border-[1px] border-gray-500 text-[18px] px-3' required placeholder='Username'ref={username} type="text" />
                    
                    <input className='outline-none h-[50px] rounded-lg border-[1px] border-gray-500 text-[18px] px-3' required  placeholder='Email' ref={email} type="Email" />
                    
                    <input className='outline-none h-[50px] rounded-lg border-[1px] border-gray-500 text-[18px] px-3' ref={password} placeholder='Password' required   type="Password" name="" minLength={6} />
                    
                    <input className='outline-none h-[50px] rounded-lg border-[1px] border-gray-500 text-[18px] px-3' ref={confirmPassword} placeholder='Confirm Password' required  type="Password" name=""  />
                    
                    <button className='h-[50px] rounded-xl border-[1px] border-gray-500 bg-fbBlue text-white text-[20px]' type='submit' onClick={handleClick}>Sign Up</button>
                    
                    <div className='flex justify-center'>
                    <Link to='/login'><button className='h-[50px] rounded-xl px-4 border-[1px] w-[100%]  border-gray-500 bg-[#42b72a] text-white text-[20px]'>Log into Account</button></Link></div>
                </form>
            </div>
        </div>
    </div>
  )
}
