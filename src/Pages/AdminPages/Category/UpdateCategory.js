import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TypeStoreForm from '../../../Store/TypeStoreForm'
import SaidAdmin from '../../../Components/Layout/SaidAdmin'

const UpdateCategory = () => {
            const btnTitle="تعديل"
            const title="تعديل القسم"
            const label="اكتب القسم"
            const [preview,setPreview]=useState(null)
            const [name,setName]=useState()
            const [store,setStore]=useState()
            const [image,setImage]=useState(null)
            const [oldImage,setOldImage]=useState(null)
            const {id}=useParams()
            const storeId=JSON.parse(localStorage.getItem("storeId"))
            const URLSITE='https://talabatak-ebon.vercel.app'
            const navigate=useNavigate()
            const fileInputRef=useRef(null)
            const handleFileChange=(e)=>{
              const file=e.target.files[0]
              if(file){
                  setImage(file)
                  const url=URL.createObjectURL(file)
                  setPreview(url)
              }
          }
    
          const getData=async()=>{
    
            try{
          const getData=await axios.get(`${URLSITE}/api/category/${id}`,{headers: { "Content-Type": "application/json"} })  
          const resData=getData.data.data
          
          setName(resData.name)
          setPreview(resData.image)
          setOldImage(resData.image)
          
        
    
            }catch(error){
                alert("خطأ في جلب البيانات")
    
            }
    
          }
    
          useEffect((id)=>{
           getData()
          },[id])
    
          const UpdateCategory=async()=>{
    
             try{
    
                 let imageUrl=oldImage
                 if(image){
                const formData=new FormData()
                formData.append("name",name)
                formData.append("image",image)
    
                
                    const sendImage= await axios.post(`${URLSITE}/api/upload`,formData,{ headers: { "Content-Type": "multipart/form-data" } })
                      imageUrl=sendImage.data.imageUrl
                      console.log(imageUrl);
            
    
            }
                        const data={
                        name,
                        image:imageUrl,
                        store:storeId
                      }
                    const sendData= await axios.patch(`${URLSITE}/api/category/${id}`,data,{headers: { "Content-Type": "application/json"} })
            
                        if(sendData.data.errors){
                        return alert(sendData.data.errors[0].msg)
                       }
                       console.log(sendData.data.data);
                       
                       alert(sendData.data.msg)
                       navigate("/admin/category")
                        setName("")
                       setImage(null)
                       setPreview(null)
    
            
                   }catch(error){
                    alert("فشلت عملية التحديث")
                   }
    
           
          }
  return (
     <div className=' CreateUser TypeStore  d-flex justify-content-between col-12  ' >
            <div className=' col-8 col-md-4 col-lg-2 said' ><SaidAdmin/></div>
            <div className=' col-12  col-md-8 col-lg-10 d-flex align-items-center justify-content-center UpdateTypeStore ' >
            <div className=" col-12 col-md-10 col-lg-4" >
                <TypeStoreForm  
                preview={preview}
                setPreview={setPreview}
                fileInputRef={fileInputRef}
                handleFileChange={handleFileChange}
                name={name}
                setName={setName}
                image={image}
                btnTitle={btnTitle}
                title={title}
                label={label}
                apply={UpdateCategory}
    
    
    
                 />
                </div>
     
            </div>
          
        </div>
  )
}

export default UpdateCategory
