import React, { useEffect, useState } from 'react'
import SaidSuper from '../../Components/Layout/SaidSuper'
import axios from 'axios'

const CreateUser = () => {

  const[name,setName]=useState()
  const[userID,setUserID]=useState()
  const[role,setRole]=useState()
  const[store,setStore]=useState()
  const[stores,setStores]=useState([])
  const[password,setPassword]=useState()
  const URL='https://talabatak-ebon.vercel.app'


  const getStores=async()=>{

   try{

    const sendData=await axios.get(`${URL}/api/store?showAll=true`,
           {headers: { "Content-Type": "application/json"} })

          setStores(sendData.data.data)

   }catch(error){
    alert("خطاء في جلب المتجر")
   }

           
  }
  const addUser=async()=>{

   try{
     const data={
      name,
      userID,
      role,
      store,
      password,

    }
    const sendData=await axios.post(`${URL}/api/user`,data,
           {headers: { "Content-Type": "application/json"} })

           if(sendData.data.errors){
            return alert(sendData.data.errors[0].msg)
           }
           console.log(sendData.data.data);
           
           alert(sendData.data.msg)
           setName("")
           setUserID("")
           setRole("")
           setStore("")
           setPassword("")


   }catch(error){
    alert("خطاء في انشاء المستخدم")
   }

           
  }

  useEffect(()=>{
    getStores()
  },[])


  return (
        <div className=' CreateUser d-flex justify-content-between col-12  ' >
          
          <div className='col-2 said' ><SaidSuper/></div>
          <div className='  col-lg-10 d-flex align-items-center justify-content-center ' >

            <form className='col-11 col-md-3 d-flex align-items-center  flex-column  ' >
                <h4 className='mt-3 fw-bold d-flex justify-content-center ' >انشاء مستخدم</h4>

                <input type='text' className='my-2 col-11 '  placeholder='اسم المستخدم' value={name} onChange={(e)=>setName(e.target.value)} />
                <input type='text' className='my-2 col-11 '  placeholder='كود المستخدم ' value={userID} onChange={(e)=>setUserID(e.target.value)} />
                <select className='my-2 col-11 ' value={role} onChange={(e)=>setRole(e.target.value)} >
                    <option>اختر الصلاحية</option>
                    <option value="super" >super</option>
                    <option value="admin" >admin</option>
                    <option value="delivery" >delivery</option>
                </select>
                <select className='my-2 col-11 ' value={store} onChange={(e)=>setStore(e.target.value)} >
                    <option>اختر المتجر</option>
                    {stores.map((item)=>{
                      return(

                        <option value={item._id} >{item.name}</option>
                      )
                    })}
                </select>
                <input type='password' className='my-2 col-11 '  placeholder='كلمة المرور' value={password} onChange={(e)=>setPassword(e.target.value)} />

                <button className='my-2 col-11 btn ' type='button' onClick={()=>addUser()} >انشاء</button>

            </form>

              </div> </div>
  )
}

export default CreateUser
