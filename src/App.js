import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import { AuthContext} from './context/AuthContext';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useContext } from 'react';
import Messenger from './pages/Messenger';
function App() {
//   const [user,setUser]=useState({_id: '621778e2b9682072b55263a9', username: 'r1', email: 'r1@gmail.com', password: '$2b$10$jwD9slcnc8o.mEtb3bhSSusSqDeBzuY7uzlWeFwIriS.gSQE5q/Iy', profilePicture: '/person/noProfile.png'});
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

  const {user} = useContext(AuthContext);
  return (<>
     <Router>
        <Routes>
          <Route exact path="/" element={user?<Home/>:<Login/>} />
          <Route exact path="/profile/:username" element={<Profile/>} />
          <Route exact path="/login" element={user ? <Navigate to='/'/> : <Login/>} />
          <Route exact path="/register" element={user ? <Navigate to='/'/> : <Register/>} />
          <Route exact path="/messenger" element={!user ? <Navigate to='/'/> : <Messenger/>} />
        </Routes>
      </Router>
    
  </>);
}

export default App;
