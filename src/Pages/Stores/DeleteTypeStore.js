
import React, { useEffect, useRef, useState } from 'react'
import TypeStoreForm from '../../Store/TypeStoreForm'
import SaidSuper from '../../Components/Layout/SaidSuper'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const DeleteTypeStore = () => {

        const btnTitle="حذف"
        const title="حذف نوع المتجر"
        const label=" نوع المتجر"
        const [preview,setPreview]=useState(null)
        const [name,setName]=useState()
        const [image,setImage]=useState(null)
        const [oldImage,setOldImage]=useState(null)
        const {id}=useParams()
        const URL='https://talabatak-ebon.vercel.app'
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
      const getData=await axios.get(`${URL}/api/typeStore/${id}`,{headers: { "Content-Type": "application/json"} })  
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

      const deleteTypeStore=async()=>{ 

         try{

                const sendData= await axios.delete(`${URL}/api/typeStore/${id}`,{headers: { "Content-Type": "application/json"} })
        
                    if(sendData.data.errors){
                    return alert(sendData.data.errors[0].msg)
                   }
                   console.log(sendData.data.data);
                   
                   alert(sendData.data.msg)
                   navigate("/superAdmin/typeStore")
    

        
               }catch(error){
                alert("فشلت عملية الحذف")
               }

       
      }





  return (
     <div className=' CreateUser TypeStore  d-flex justify-content-between col-12  ' >
        <div className='col-6 col-md-4 col-lg-2 said' ><SaidSuper/></div>
        <div className=' col-12  col-md-8 col-lg-10 d-flex align-items-center justify-content-center UpdateTypeStore ' >
        <div className="col-12 col-md-10 col-lg-4" >
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
            apply={deleteTypeStore}



             />
            </div>
 
        </div>
      
    </div>
  )
}

export default DeleteTypeStore
