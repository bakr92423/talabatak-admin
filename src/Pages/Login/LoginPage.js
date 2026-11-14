import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios, { Axios } from 'axios'
import { useNavigate } from 'react-router-dom'


const LoginPage = () => {

   const navigate=useNavigate()
   const [userID,setUserID]=useState()
   const [password,setPassword]=useState()
   const URL='https://talabatak-ebon.vercel.app'


  
      const login=async()=>{
  
      const sendData=await axios.post(`${URL}/api/login`,{
         userID,
         password
         })
  
        const token=sendData.data.token
        const userData=sendData.data.data
         
         if(!token||!userID||!password){
            return( alert(sendData.data.msg))
         }
          const userRole=userData.role
     
  
      sessionStorage.setItem("userRole",JSON.stringify(userRole))
      sessionStorage.setItem("user",JSON.stringify(userData))
      localStorage.setItem("storeId",JSON.stringify(sendData.data.data.store))
      localStorage.removeItem("token")
      localStorage.setItem("token",token)
      sessionStorage.setItem("storeId",sendData.data.data.store)
      
      
      if(userRole==="super"){
        navigate("/Home")
      }else if(userRole==="admin"){
        navigate("/admin/Home")
      }else if(userRole==="delivery"){
         navigate("/admin/deliveryHome")

      }
         
      
      
      }



  return (
    <div className='LoginPage d-flex align-items-center justify-content-center ' >
        <form className=' d-flex align-items-center flex-column col-11 col-md-4 col-lg-2 ' >
            <h5 className='my-4 fw-bold' >تسجيل دخول</h5>
            <input type='text' className='my-3 mt-4 text-center ' placeholder='اسم المستخدم' value={userID} onChange={(e)=>setUserID(e.target.value)}  />
            <input type='password' className='my-3 text-center ' placeholder='كلمة المرور' value={password} onChange={(e)=>setPassword(e.target.value)} />
            <Link to='' className='btn col-8 mt-4 ' onClick={()=>login()}  >دخول</Link>

        </form>
        
      
    </div>
  )
}

export default LoginPage
