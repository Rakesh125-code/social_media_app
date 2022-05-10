
import React from 'react'
import {format} from "timeago.js"
export default function Message({message,own}) {
  return (
    <>
    <div className={`flex flex-col ${own?"items-end":"items-start"} `}>
        {/* top */}
        <div className='flex items-center'>
        <img className='h-[40px] w-[40px] rounded-full object-cover mr-[12px] ' src="./assets/person/1.png" alt="" />
        <p className={`${own?"  text-white bg-fbBlue":"text-black bg-slate-200"} rounded-3xl p-3 max-w-[400px] text-[15px]`}>{message.text} </p>
        </div>
        {/* bottom */}
        <div className='m-2 text-[12px] font-[400]'>
            {format(message.createdAt)}
        </div>
    </div>
    </>
  )
}
