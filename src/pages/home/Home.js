import React from 'react'
import { Feed } from '../../components/feed/Feed'
import { Leftbar } from '../../components/leftbar/Leftbar'
import { Rightbar } from '../../components/rightbar/Rightbar'
import { Topbar } from '../../components/topbar/Topbar'
function Home() {
  return (
    <>
    <Topbar/>
    <div className='flex justify-between w-full'>
    <Leftbar/>
      <div className='flex justify-around w-[75%]'>
      <Feed/>
     <Rightbar/>
      </div>
    </div>
    </>
  )
}

export default Home