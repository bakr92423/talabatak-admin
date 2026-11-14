import React, { useEffect, useState } from 'react'
import DisableUserForm from '../../Components/Users/DisableUserForm'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
import DeleteUserForm from '../../Components/Users/DeleteUserForm'
import SaidSuper from '../../Components/Layout/SaidSuper'

const DeleteUser = () => {
    let URL='https://talabatak-ebon.vercel.app'
  const {id}=useParams()
  const [name,setName]=useState()
  const [userID,setUserID]=useState()
  const [role,setRole]=useState()
  const [store,setStore]=useState()
  const [password,setPassword]=useState()
  const navigate=useNavigate()
  const title="حذف مستخدم"
  const btnTitle="حذف"
  


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

    const deleteUser=async()=>{
    
       try{

        const sendData=await axios.delete(`${URL}/api/user/${id}`,{headers: { "Content-Type": "application/json"} })

  
               alert(sendData.data.msg)
               navigate("/superAdmin/currentUsers")

    
    
       }catch(error){
        alert("خطاء في حذف المستخدم")
       }
    
               
      }

    useEffect((id)=>{
      getUserData()
    },[id])




  return (
     <div className=' CreateUser d-flex justify-content-between col-12  ' >
          
          <div className=' col-8 col-md-4 col-lg-2 said' ><SaidSuper/></div>
          <div className='  col-lg-10 d-flex align-items-center justify-content-center ' >
            <DeleteUserForm

            title={title}
            name={name}
            setName={setName}
            userID={userID}
            setUserID={setUserID}
            role={role}
            setRole={setRole}
            store={store}
            setStore={setStore}
            password={password}
            setPassword={setPassword}
            btnTitle={btnTitle}
            apply={deleteUser}
            
            />


          </div> 
              </div>
  )
}

export default DeleteUser
