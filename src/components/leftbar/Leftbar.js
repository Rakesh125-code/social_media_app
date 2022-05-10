import { RssFeed,School,Event, WorkOutline,HelpOutline,Bookmark,Group,PlayCircleFilledOutlined ,Chat} from '@material-ui/icons'
import React from 'react'
import CloseFriend from '../closefriend/CloseFriend'
export const Leftbar = () => {
  return (
      <>
      {/* Leftbar */}
    <div className=' w-1/4 h-[calc(100vh-48px)] scrollbar scrollbar-hidden'>

      {/* leftbarwrapper */}
    <div className='p-2'>

      {/* sidebarlist */}
      <ul className=''>
        {/* side/leftbarlistitems */}
        <li className='m-2'>
          {/* icon */}
          <RssFeed className='m-2'/>
          {/* leftbarListItemText */}
          <span>Feed</span>
        </li>
        <li className='m-2'> 
          <Chat className='m-2'/>
          <span>Chats</span>
        </li>
        <li className='m-2'> 
          <PlayCircleFilledOutlined className='m-2'/>
          <span>Videos</span>
        </li>

        <li className='m-2'> 
          <Group className='m-2'/>
          <span>Groups</span>
        </li>
        <li className='m-2'> 
          <Bookmark className='m-2'/>
          <span>Bookmarks</span>
        </li>
        <li className='m-2'> 
          <HelpOutline className='m-2'/>
          <span>Questions</span>
        </li>
        <li className='m-2'> 
          <WorkOutline className='m-2'/>
          <span>Jobs</span>
        </li>
        <li className='m-2'> 
          <Event className='m-2'/>
          <span>Events</span>
        </li>
        <li className='m-2'> 
          <School className='m-2'/>
          <span>Courses</span>
        </li>
      </ul>
      <button>Show More</button>
      <hr />

      {/* lefbarfriendlist */}
            <ul className=''>
             <CloseFriend/>
            </ul>
    </div>
    </div>
    </>
  )
}

