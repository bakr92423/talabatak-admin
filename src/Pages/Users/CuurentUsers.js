import React, { useEffect, useState } from 'react'
import SaidSuper from '../../Components/Layout/SaidSuper'
import { Link } from 'react-router-dom'
import axios from 'axios'


const CuurentUsers = () => {

      const[users,setUsers]=useState([])
      const[result,setResult]=useState(0)
      const URL='https://talabatak-ebon.vercel.app'

    
    
   const getUser=async()=>{
    
    try{
        const getData=await axios.get(`${URL}/api/user`,
               {headers: { "Content-Type": "application/json"} })
               const resData=getData.data.data
               console.log(resData,"resdata");
               
               setUsers(resData)
               setResult(getData.data.result)

       }catch(error){
        alert("خطاء في جلب المستخدم")
       }
    
               
      }

      useEffect(()=>{
        getUser()
    
      },[])


  return (
    <div className=' CreateUser d-flex justify-content-between col-12  ' >
              
              <div className=' col-8 col-md-4 col-lg-2 said' ><SaidSuper/></div>
              <div className='col-11 col-md-7\]
              
              
              
                col-lg-10  justify-content-center mt-5 ' >

                <h5 className='fw-bold my-5 mx-3 ' >عدد المستخدمين : {result} </h5>

                <div className='d-flex flex-column align-items-center' >

                    {users.map((item)=>{
                        return(
                 <div className='boxUser col-10 d-flex flex-column align-items-between my-2 ' >
                    <div className=' d-flex  justify-content-around py-2 ' >
                        <h5 className='fw-bold text-center col-2 ' >اسم المستخدم</h5>
                        <h5 className='fw-bold text-center col-2 ' >كود المستخدم</h5>
                        <h5 className='fw-bold text-center col-2 ' >الصلاحية</h5>
                        <h5 className='fw-bold text-center col-2 ' >المتجر</h5>
                        <Link to={`/superAdmin/updateUser/${item._id}`}  className='col-1 text-center d-flex justify-content-center align-items-center ' ><i className='fa-solid fa-pen' ></i></Link>
                    </div>
                    <div className=' d-flex  justify-content-around py-1 ' >
                         <p className='fw-bold text-center col-2 ' >{item.name}</p>
                        <p className='fw-bold text-center col-2 ' >{item.userID}</p>
                        <p className='fw-bold text-center col-2 ' >{item.role}</p>
                        <p className='fw-bold text-center col-2 ' >{item.store?.name||"admin"}</p>
                        <Link to={`/superAdmin/deleteUser/${item._id}`}  className='col-1 text-center d-flex justify-content-center align-items-center ' ><i className='fa-solid fa-trash' ></i></Link>
                    </div>

                </div>

                        )
                    })}
                   

                </div>

    
                  </div> </div>
  )
}

export default CuurentUsers
