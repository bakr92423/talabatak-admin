import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import SaidAdmin from '../../../Components/Layout/SaidAdmin'

const CategoryPage = () => {

  const [name,setName]=useState()
  const [image,setImage]=useState(null)
  const [category,setCategory]=useState([])
  const [store,setStore]=useState()
  const [preview,setPreview]=useState(null)
  const fileInputRef=useRef(null)
  const handleFileChange=(e)=>{
    const file=e.target.files[0]
          if(file){
              setImage(file)
              const url=URL.createObjectURL(file)
              setPreview(url)
          }
      }
      const storeId=JSON.parse(localStorage.getItem("storeId"))
      const URLSITE='https://talabatak-ebon.vercel.app'

        const getUserIdFromToken = () => {
    const token = localStorage.getItem('token')
    if (!token) return null
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.id || payload._id || payload.userId || payload.user_id
    } catch (e) {
      return null
    }
  }


  
       const getCategory=async()=>{
      
              try{
                  const ownerId = getUserIdFromToken()
                 if (!ownerId) return
            const getData=await axios.get(`${URLSITE}/api/category/owner/${ownerId}`,{headers: { "Content-Type": "application/json"} })  
            const resData=getData.data.data
            console.log(resData,"resdata");
            
            
            setCategory(resData)
      
              }catch(error){
                  alert("خطأ في جلب البيانات")
      
              }
      
            }
     
  
     useEffect(()=>{
                getCategory()
          },[])
  
      const addCategory=async()=>{
  
         try{
  
           const formData= new FormData()
          formData.append("image",image)
          formData.append("name",name)
          const sendImage= await axios.post(`${URLSITE}/api/upload`,formData,{ headers: { "Content-Type": "multipart/form-data" } })
           const imageUrl=sendImage.data.imageUrl
            console.log(imageUrl);
  
            const data={
              name,
              image:imageUrl,
              store:storeId
            }
          const sendData= await axios.post(`${URLSITE}/api/category`,data,{headers: { "Content-Type": "application/json"} })
  
              if(sendData.data.errors){
              return alert(sendData.data.errors[0].msg)
             }
             console.log(sendData.data.data);
             
             alert(sendData.data.msg)
             getCategory()
              setName("")
             setImage(null)
             setPreview(null)
  
         }catch(error){
          alert("فشلت عملية الاضافة")
         }
  
  
      }
  return (
    <div className='CategoryPage d-flex justify-content-between' >
      <div className='col-8 col-md-3 said col-lg-2' ><SaidAdmin/></div>
      <div className='col-12 col-md-9 col-lg-10 d-flex justify-content-center mt-3 ' >

        <div className='parent d-flex mt-5 col-11 col-lg-10 justify-content-between ' >
        
          <div className='col-12 col-md-6 mb-1 col-lg-5' >
             <form className=' d-flex align-items-center flex-column col-12   ' >
        
              <div className='d-flex justify-content-between mx-2 align-items-center col-11 col-lg-11 ' ><p className='fw-bold text-light  mt-3  px-4 ' >جديد</p><h5 className='my-4 fw-bold align-items-center ' >اضافة قسم جديد</h5></div>
                   
                <div className='d-flex flex-column align-items-center fw-bold col-12 ' ><label>اكتب القسم</label><input type='text' className=' d-flex col-10 py-2 mt-2  text-center ' value={name} onChange={(e)=>setName(e.target.value)}   /></div>
        
               <div className=' d-flex col-11 py-5   ' >
                   <div className=' d-flex col-12 justify-content-center orang-box align-items-center '  onClick={()=>fileInputRef.current.click()} >
                                {preview?(
                       <img src={preview} style={{width:"100%"}} />
                  ):(<h5 className='fw-bold text-light ' >اختر الصورة</h5>)}
                </div>
                <input type='file' id='fileInput' ref={fileInputRef} onChange={handleFileChange} />
              </div>
                <button  className='btn fw-bold col-8 mt-2 mb-3 py-2 ' type='button' onClick={()=>addCategory()}   >اضافة</button>
          
                    
        
            </form>
          </div>
        
           <div className=' d-flex  justify-content-center parentItems  col-12 col-md-6 col-lg-7  ' >
        
        
              {category.map((item)=>{
                  return(
                      <div className=' item mx-1 d-flex align-items-center flex-column col-4 col-md-12 col-lg-4 my-2 ' >
                   <img src={item.image} />
        
                  <h4 className='col-12 text-center fw-bold text-light py-1 ' >{item.name}</h4>
                  <div className='btns col-12 d-flex  justify-content-between  ' > <Link to={`/admin/updateCategory/${item._id}`} className='mx-2 fw-bold text-light px-1  ' >تعديل </Link  > <Link to={`/admin/deleteCategory/${item._id}`} className='mx-2 fw-bold text-light px-1  ' >حذف </Link> </div>
        
              </div>
                                )
               })}
                            
        
          </div>
        
                
        
            </div>
      </div>
        
      
    </div>
  )
}

export default CategoryPage
