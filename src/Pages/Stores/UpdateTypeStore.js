import React, { useEffect, useRef, useState } from 'react'
import TypeStoreForm from '../../Store/TypeStoreForm'
import SaidSuper from '../../Components/Layout/SaidSuper'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const UpdateTypeStore = () => {

        const btnTitle="تعديل"
        const title="تعديل نوع المتجر"
        const label="اكتب نوع المتجر"
        const [preview,setPreview]=useState(null)
        const [name,setName]=useState()
        const [image,setImage]=useState(null)
        const [oldImage,setOldImage]=useState(null)
        const {id}=useParams()
        const SITE='https://talabatak-ebon.vercel.app'
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
      const getData=await axios.get(`${SITE}/api/typeStore/${id}`,{headers: { "Content-Type": "application/json"} })  
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

      const updateTypeStore=async()=>{

         try{

             let imageUrl=oldImage
             if(image){
            const formData=new FormData()
            formData.append("name",name)
            formData.append("image",image)

            
                const sendImage= await axios.post(`${SITE}/api/upload`,formData,{ headers: { "Content-Type": "multipart/form-data" } })
                  imageUrl=sendImage.data.imageUrl
                  console.log(imageUrl);
        

        }
                    const data={
                    name,
                    image:imageUrl
                  }
                const sendData= await axios.patch(`${SITE}/api/typeStore/${id}`,data,{headers: { "Content-Type": "application/json"} })
        
                    if(sendData.data.errors){
                    return alert(sendData.data.errors[0].msg)
                   }
                   console.log(sendData.data.data);
                   
                   alert(sendData.data.msg)
                   navigate("/superAdmin/typeStore")
                    setName("")
                   setImage(null)
                   setPreview(null)

        
               }catch(error){
                alert("فشلت عملية التحديث")
               }

       
      }





  return (
     <div className=' CreateUser TypeStore  d-flex justify-content-between col-12  ' >
        <div className=' col-6 col-md-4 col-lg-2 said' ><SaidSuper/></div>
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
            label={label}
            title={title}
            apply={updateTypeStore}



             />
            </div>
 
        </div>
      
    </div>
  )
}

export default UpdateTypeStore
