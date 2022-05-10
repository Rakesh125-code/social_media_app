import React from 'react'
import { CommentRounded } from '@material-ui/icons';
export const Comment = () => {
  return (
    <div>
       
        <div className='cursor-pointer'><CommentRounded/>
        </div>
        <div>
        <input className='rounded border-[1px] border-gray-200 outline-none px-2 py-[2px] text-gray-800 hidden' type="text" />

        <div>
            
        </div>
        </div>
    </div>
  )
}
