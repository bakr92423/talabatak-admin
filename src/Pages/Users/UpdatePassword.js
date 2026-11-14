import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SaidAdmin from '../../Components/Layout/SaidAdmin'

const UpdatePassword = () => {
        let URL='https://talabatak-ebon.vercel.app'
      const [name,setName]=useState()
      const [userID,setUserID]=useState()
      const [role,setRole]=useState()
      const [store,setStore]=useState()
      const [password,setPassword]=useState()
      const navigate=useNavigate()
      const title="تحديث كلمةالمرور"
      const btnTitle="تحديث"
      const user=JSON.parse(sessionStorage.getItem("user"))
      const id=user._id
      console.log(id);
      
    
    
      const getUserData=async()=>{
      
         try{
          const getData=await axios.get(`${URL}/api/user/${id}`,{headers: { "Content-Type": "application/json"} })
          const resData=getData.data.data
          console.log(getData,"getData");
          
          setName(resData.name)
          setUserID(resData.userID)
          setRole(resData.role)
          setStore(resData.store)
         
      
      
      
         }catch(error){
          alert("خطاء في جلب المستخدم")
         }
      
                 
        }
    

    
        const updateUser=async()=>{
        
           try{
             const data={
              name,
              userID,
              role,
              store,
              password,
        
            }
            const sendData=await axios.patch(`${URL}/api/user/${id}`,data,{headers: { "Content-Type": "application/json"} })
               console.log(sendData,"sendData");
               
                   if(sendData.data.errors){
                    return alert(sendData.data.errors[0].msg)
                   }
                   alert(sendData.data.msg)
                   navigate("/")
    
        
        
           }catch(error){
            alert("خطاء في تحديث المستخدم")
           }
        
                   
          }
    
        useEffect((id)=>{
          getUserData()
        },[id])

  return (
<div className=' CreateUser UpdatePassword d-flex justify-content-between col-12  ' >
          
          <div className=' col-8 col-md-4 col-lg-2 said' ><SaidAdmin/></div>
          <div className=' col-11 col-md-7  col-lg-10 d-flex align-items-center justify-content-center ' >
             <form className='col-11 col-md-3 d-flex align-items-center  flex-column  ' >
                <h4 className='mt-3 fw-bold d-flex justify-content-center ' >{title}</h4>

                <input type='text' disabled="true"  className='my-2 col-11 '  placeholder='اسم المستخدم' value={name} onChange={(e)=>setName(e.target.value)} />
                <input type='text' disabled="true"  className='my-2 col-11 '  placeholder='كود المستخدم ' value={userID} onChange={(e)=>setUserID(e.target.value)} />
                <input type='text' disabled="true"  className='my-2 col-11 '  placeholder='كود المستخدم ' value={role} onChange={(e)=>setRole(e.target.value)} />
                <input type='password' disabled="true"  className='my-2 col-11 '  placeholder='كلمة المرور' value="******"  />
                <input type='password' className='my-2 col-11 '  placeholder='كلمة المرور' value={password} onChange={(e)=>setPassword(e.target.value)}  />

                <button className='my-2 col-11 btn ' type='button' onClick={()=>updateUser()} >{btnTitle}</button>

            </form>

          </div> 
              </div>
  )
}

export default UpdatePassword
