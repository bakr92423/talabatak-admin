import React, { useEffect, useRef, useState } from 'react'
import SaidSuper from '../../Components/Layout/SaidSuper'
import StoreForm from '../../Components/Stores/StoreForm'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateStore = () => {
  const btnTitle="تعديل"
  const title="تعديل متجر"
  const icon="fa-solid fa-pen"
  const [name,setName]=useState()
  const [description,setDescription]=useState()
  const [phone,setPhone]=useState()
  const [address,setAddress]=useState()
  const [isActive,setIsActive]=useState()
  const [typeStore,setTypeStore]=useState()
  const [typeStoresCurrent,setTypeStoresCurrent]=useState([])
  const [image,setImage]=useState(null)
  const [oldImage,setOldImage]=useState(null)
  const [estimatedDeliveryTime,setEstimatedDeliveryTime]=useState()
  const [preview,setPreview]=useState(null)
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
                const getData=await axios.get(`${SITE}/api/typeStore`,{headers: { "Content-Type": "application/json"} })  
                const resData=getData.data.data
                console.log(resData,"op");
                
                setTypeStoresCurrent(resData)
          
                  }catch(error){
                      alert("خطأ في جلب البيانات")
          
                  }
          
          }
      const getStoreData=async()=>{
          
                  try{
                const getData=await axios.get(`${SITE}/api/store/${id}`,{headers: { "Content-Type": "application/json"} })  
                const resData=getData.data.data
                console.log(resData);
                
                setName(resData.name)
                setDescription(resData.description)
                setPhone(resData.phone)
                setAddress(resData.address)
                setIsActive(resData.isActive)
                setEstimatedDeliveryTime(resData.estimatedDeliveryTime)
                setPreview(resData.image)
                setOldImage(resData.image)
                setTypeStore(resData.typeStore)
          
                  }catch(error){
                      alert("خطأ في جلب البيانات")
          
                  }
          
          }
      
         useEffect(()=>{
             getData()

          },[])
          useEffect(()=>{
             getStoreData()
            },[id])


       const updateStore=async()=>{
      
             try{

              let imageUrl=oldImage

              if(image){
              const formData= new FormData()
              formData.append("image",image)
              formData.append("name",name)
              const sendImage= await axios.post(`${SITE}/api/upload`,formData,{ headers: { "Content-Type": "multipart/form-data" } })
               imageUrl=sendImage.data.imageUrl
                console.log(imageUrl);
              }

                const data={
                  name,
                  description,
                  phone,
                  address,
                  isActive,
                  typeStore,
                  estimatedDeliveryTime,
                  image:imageUrl
                }
              const sendData= await axios.patch(`${SITE}/api/store/${id}`,data,{headers: { "Content-Type": "application/json"} })
                console.log(sendData,"sendData");
                
      
                  if(sendData.data.errors){
                  return alert(sendData.data.errors[0].msg)
                 }
                 console.log(sendData.data.data);
                 
                 alert(sendData.data.msg)
                 navigate("/superAdmin/currentStore")

      
             }catch(error){
              alert(error.msg,"فشلت عملية التحديث")
             }
      
      
          }


  return (
    <div className=' CreateUser d-flex justify-content-between col-12  ' >
            <div className=' col-8 col-md-3 col-lg-2 said' ><SaidSuper/></div>
            <div className=' col-md-9  col-lg-10 d-flex align-items-center justify-content-center ' ><StoreForm
            title={title}
            btnTitle={btnTitle}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            phone={phone}
            setPhone={setPhone}
            address={address}
            setAddress={setAddress}
            isActive={isActive}
            setIsActive={setIsActive}
            typeStore={typeStore}
            typeStores={typeStoresCurrent}
            setTypeStore={setTypeStore}
            image={image}
            setImage={setImage}
            estimatedDeliveryTime={estimatedDeliveryTime}
            setEstimatedDeliveryTime={setEstimatedDeliveryTime}
            preview={preview}
            setPreview={setPreview}
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
            icon={icon}
            Apply={updateStore}
    
            /></div>
          
        </div>
  )
}

export default UpdateStore
