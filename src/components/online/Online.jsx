import React from 'react'

export default function Online(user) {
  return (
    <li className='flex items-center my-4'>
            {/* image profile */}
            <div className='relative'>
              <img className='w-10 h-10 rounded-full object-cover ' src="/assets/person/3.png" alt="" />
              {/* online */}
              <span className='bg-green-500 h-3 w-3 border-2 border-white  rounded-full absolute -top-[3px] -right-[1px]'></span>
            </div>
            {/* username */}
            <span className='ml-2 font-[500]'>Sanju</span>
    </li>
  )
}
