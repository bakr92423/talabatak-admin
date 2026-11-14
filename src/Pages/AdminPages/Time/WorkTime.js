import React, { useEffect, useState } from 'react'
import SaidAdmin from '../../../Components/Layout/SaidAdmin'
import { Link } from 'react-router-dom'
import axios from 'axios'

const WorkTime = () => {
    const [openingTime,setOpeningTime]=useState()
    const [closingTime,setClosingTime]=useState()
    const [isOpen,setIsOpen]=useState()
    const [timeTick,setTimeTick]=useState(Date.now())
    const id=JSON.parse(localStorage.getItem("storeId"))
    const URLSITE='https://talabatak-ebon.vercel.app'
    const timeToMinutes=(timeStr)=>{
      if(!timeStr)return 0
      const [h,m]=timeStr.split(':').map(Number)
      return h * 60 + m
    }
    

    const checkStatus=()=>{
        if(isOpen ===false) return false
      if(!openingTime|| !closingTime)return true
      const currentTime=new Date()
      const currentTimeMinutes=currentTime.getHours() * 60 + currentTime.getMinutes()
      const openTimeInMinutes=timeToMinutes(openingTime) 
      const closseTimeInMinutes=timeToMinutes(closingTime)
      return currentTimeMinutes>=openTimeInMinutes && currentTimeMinutes <=closseTimeInMinutes
      
    }
    const getData=async()=>{
    try{

     const respose= await axios.get(`${URLSITE}/api/store/${id}`,{headers: { "Content-Type": "application/json"} })
         const store=respose.data.data
         console.log(store,"resData");
         
         setOpeningTime(store.openingTime)
         setClosingTime(store.closingTime)              
         setIsOpen(store.isOpen)              
     }catch(error){
     alert("فشلت عملية جلب البيانات")
     }
    }
    const changeTime=async()=>{
              try{
              
                console.log(id);
                
                        const data={
                         openingTime,
                         closingTime,
                         isOpen
                        }
                      const sendData= await axios.patch(`${URLSITE}/api/store/${id}`,data,{headers: { "Content-Type": "application/json"} })
                        console.log(sendData,"sendData");
                        
              
                          if(sendData.data.errors){
                          return alert(sendData.data.errors[0].msg)
                         }
                         console.log(sendData.data.data);
                         
                         alert(sendData.data.msg)
        
                          setOpeningTime("")
                          setClosingTime("")              
                     }catch(error){
                      alert("فشلت عملية الاضافة")
                     }
    }

    useEffect(()=>{
       getData()
    },[])
    useEffect(()=>{
       const timer=setInterval(()=>{
        setTimeTick(Date.now())
       },60000)
       return ()=>clearInterval(timer)
    },[timeTick])

  return (
     <div className=' CreateUser WorkTime d-flex justify-content-between col-12  ' >
          <div className=' col-8 col-md-4 col-lg-2 said  ' ><SaidAdmin/></div>
             <div className=' col-12 col-md-8 col-lg-10 d-flex flex-column align-items-center ' >
                 <form className=' col-12 col-md-11 col-lg-10 d-flex flex-column align-items-center mt-5  '  >
                    <div className=' d-flex justify-content-between col-12 mb-5  ' > 
                     <h5 className='fw-bold mx-2 mt-2' >تحديد مواعيد عمل المكان</h5>
                    <Link to={`/admin/Home`} className='fa-solid fa-xmark my-0 fw-bold d-flex justify-content-center align-items-center ' ></Link> 
                            </div>
                        <div className=' col-11  col-lg-11  d-flex justify-content-between  banner align-items-center py-4 mb-5 '>
                            <h5 className='mx-2 fw-bold ' >حالة المتجر</h5>  <span className={`mx-2 fw-bold d-flex align-items-center pb-1 px-4 ${checkStatus()?"bg-success text-light":"bg-danger text-light"} `} >{checkStatus()?"مفتوح":"مغلق"}</span>

                        </div>
                <div className='col-lg-10  d-flex boxInputs align-items-center justify-content-center mt-2 mb-5 '>
                     <div className='col-11 col-md-6 my-2 col-lg-4 d-flex' > <label className='fw-bold' >من</label>
                             <input type='time' className='col-8 mx-1 ' value={openingTime} onChange={(e)=>setOpeningTime(e.target.value)}  />  </div> 
                            <div className='col-11 col-md-6 my-2 col-lg-4 d-flex' > <label className='fw-bold' >الى</label>
                             <input type='time' className='col-8 mx-1 ' value={closingTime} onChange={(e)=>setClosingTime(e.target.value)}   />  </div> 
                            <div className='col-11 col-md-6 my-2 col-lg-4 d-flex' > <label className='fw-bold' >حالة المتجر</label> 
                              <select className='col-8 mx-1 ' value={isOpen} onChange={(e)=>setIsOpen(e.target.value)}  >
                                <option value={true} >مفنوح</option>
                                <option value={false} >مغلق</option>
                              </select>
                            </div> 
                        </div>
                        <div className='col-12 d-flex justify-content-center mt-5  ' >
                        <button className='btn py-2 col-11 col-md-4 col-lg-3 ' type='button' onClick={()=>changeTime()} >تطبيق 
                        <i className='fa-solid fa-floppy-disk fw-bold mx-2 '  ></i> </button></div>
                    </form>

        
                       
        
                          
         </div>
                      
     </div>
  )
}

export default WorkTime
