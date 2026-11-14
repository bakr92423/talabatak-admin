import React, { useEffect, useState } from 'react'
import DisableUserForm from '../../Components/Users/DisableUserForm'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import SaidSuper from '../../Components/Layout/SaidSuper'

const UpdateUser = () => {
    let URL='https://talabatak-ebon.vercel.app'
  const {id}=useParams()
  const [name,setName]=useState()
  const [userID,setUserID]=useState()
  const [role,setRole]=useState()
  const [store,setStore]=useState()
   const[stores,setStores]=useState([])
  const [password,setPassword]=useState()
  const navigate=useNavigate()
  const title="تعديل المستخدم"
  const btnTitle="تعديل"


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

     const getStores=async()=>{
    
       try{
    
        const sendData=await axios.get(`${URL}/api/store`,
               {headers: { "Content-Type": "application/json"} })
    
              setStores(sendData.data.data)
    
       }catch(error){
        alert("خطاء في جلب المتجر")
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
    useEffect(()=>{
      getStores()
    },[])




  return (
     <div className=' CreateUser d-flex justify-content-between col-12  ' >
          
          <div className=' col-8 col-md-4 col-lg-2 said mt-3 ' ><SaidSuper/></div>
          <div className=' col-11 col-md-8 col-lg-10 d-flex align-items-center justify-content-center ' >
            <DisableUserForm

            title={title}
            name={name}
            setName={setName}
            userID={userID}
            setUserID={setUserID}
            role={role}
            setRole={setRole}
            stores={stores}
            store={store}
            setStore={setStore}
            password={password}
            setPassword={setPassword}
            btnTitle={btnTitle}
            apply={updateUser}
            
            />


          </div> 
              </div>
  )
}

export default UpdateUser
