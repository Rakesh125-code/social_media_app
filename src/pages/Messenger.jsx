import React from 'react'
import Conversations from '../components/Conversations'
import Message from '../components/Message'
import { Topbar } from '../components/topbar/Topbar'
import { Send } from '@material-ui/icons'
import ChatOnline from '../components/ChatOnline'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import {io} from "socket.io-client"
const axios = require('axios');
export default function Messenger() {

    const [conversations, setConversations] = useState([]);
    const [currentChat,setCurrentChat]=useState(null)
    const [messages,setMessages]=useState([]);
    const [newMessages,setNewMessages]=useState("");
    const [arriavlMessage,setArrivalMessage]=useState(null);
    const [onlineUsers,setOnlineUsers]=useState([]);
    const {user} = useContext(AuthContext);
    const scrollRef=useRef();
    const socket = useRef();
    useEffect(()=>{
        socket.current=io("ws://localhost:8900");
        socket.current.on('getMessage',data=>{
            setArrivalMessage({
                sender:data.senderId,
                text:data.text,
                createdAt:Date.now(),
            })
        })
       
    },[])
    useEffect(()=>{
        arriavlMessage&&currentChat?.members.includes(arriavlMessage.sender)&&setMessages((prev)=>[...prev,arriavlMessage])
    },[arriavlMessage,currentChat])
    useEffect(()=>{
        socket.current.emit("addUser",user._id);
        socket.current.on("getUsers",(users)=>{
            setOnlineUsers(user.followings.filter(f=>users.some(u=>u.userId===f)));
        })
    },[user._id])
   

    useEffect(() => {
      const getConversation=async ()=>{
          try {
              const res = await axios.get('/conversations/'+user._id);
              setConversations(res.data);
          } 
          catch (error) {
              console.log(error);
          }
      }
      getConversation();
    }, [user._id])

    useEffect(()=>{
        const getMessages=async ()=>{
            try {
                const res=await axios.get('/messages/'+currentChat?._id);
                setMessages(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getMessages();
    },[currentChat])
    // console.log(messages);
const handleSend= async (e)=>{
    e.preventDefault();
    const message={
        sender:user._id,
        text:newMessages,
        conversationId:currentChat._id
    }
    const receiverId=currentChat.members.find(member=>member!==user._id)
    socket.current.emit('sendMessage',{
        senderId:user._id,
        receiverId,
        text:newMessages
    })
    try {
        const res = await axios.post('/messages',message);
        setMessages([...messages,res.data])
        setNewMessages("");
    } catch (error) {
        console.log(error);
    }

}

useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:"smooth"});
},[messages])

//serach friends
const [query,setQuery] =useState("");
  return (
    <>
    <Topbar/>
    {/* messenger */}
    <div className='h-[calc(100vh-48px)] flex'>

        {/* chatMenu */}
        <div className='flex-[3.5]'>
            {/* wrapper */}
            <div className=' p-2 h-full'>
                <input className='outline-none border-b-2 w-full p-2 mb-2' placeholder='Search for friends' type="text" onChange={(e)=>setQuery(e.target.value)}
                value={query} />
                {conversations.map(c=>(
                    <div onClick={()=>setCurrentChat(c)}>
                <Conversations conversation={c} currentUser={user} />
                    </div>
                )) }
               
            </div>
        </div>

        {/* chatBox */}
        <div className='flex-[5.5] mx-3'>
            <div className=' h-full relative'>
                {currentChat?<>
                {/* top */}
                <div className='h-[85%] flex flex-col scrollbar scrollbar-track-gray-200 scrollbar-thumb-gray-400  p-3'>
                    {messages.map((m)=>(
                        <div ref={scrollRef}>

                        <Message  message={m} own={m.sender===user._id}/>
                        </div>
                    ))}
                    {/* <Message/> */}
                </div>
                {/* bottom */}
                <div className='flex items-center mt-1 justify-center'>
                    <textarea className='outline-none w-[80%] p-2 px-4 border-2 rounded-3xl scrollbar scrollbar-hidden ' placeholder="Message"
                    onChange={(e)=>setNewMessages(e.target.value)}
                    value={newMessages}
                    ></textarea>
                  
                    <Send className='cursor-pointer text-fbBlue ml-3 border-[1.5px] rounded-full scale-[1.6] p-[2.5px] border-fbBlue' onClick={handleSend}
                    />
                   
                </div></> : <span className='absolute top-[40%] left-[13%] text-gray-400 text-[30px] cursor-default'>Open a Conversation to start a chat</span>}
            </div>
        </div>

        {/* chatOnline */}
        <div className='flex-[3]'>
            <div className=' p-2 h-full' >
                    <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat} />
                    
            </div>
        </div>
    </div>
    </>
  )
}
