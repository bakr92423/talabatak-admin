import React, { useEffect, useRef, useState } from 'react'
import SaidSuper from '../../Components/Layout/SaidSuper'
import StoreForm from '../../Components/Stores/StoreForm'
import axios from 'axios'


const AddStores = () => {
  const SITE="https://talabatak-ebon.vercel.app"
  const btnTitle="اضافة"
  const title="اضافة متجر جديد"
  const icon='fa-solid fa-plus'
  const [name,setName]=useState()
  const [description,setDescription]=useState()
  const [phone,setPhone]=useState()
  const [address,setAddress]=useState()
  const [isActive,setTIsActive]=useState()
  const [typeStore,setTypeStore]=useState()
  const [typeStores,setTypeStores]=useState([])
  const [image,setImage]=useState(null)
  const [estimatedDeliveryTime,setEstimatedDeliveryTime]=useState()
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


      const getData=async()=>{
          
                  try{
                const getData=await axios.get(`${SITE}/api/typeStore`,{headers: { "Content-Type": "application/json"} })  
                const resData=getData.data.data
                
                setTypeStores(resData)
          
                  }catch(error){
                      alert("خطأ في جلب البيانات")
          
                  }
          
                }
      
                 useEffect(()=>{
                       getData()
                      },[])


       const addStore=async()=>{
      
             try{
      
               const formData= new FormData()
              formData.append("image",image)
              formData.append("name",name)
              const sendImage= await axios.post(`${SITE}/api/upload`,formData,{ headers: { "Content-Type": "multipart/form-data" } })
               const imageUrl=sendImage.data.imageUrl
                console.log(imageUrl);
      
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
              const sendData= await axios.post(`${SITE}/api/store`,data,{headers: { "Content-Type": "application/json"} })
                console.log(sendData,"sendData");
                
      
                  if(sendData.data.errors){
                  return alert(sendData.data.errors[0].msg)
                 }
                 console.log(sendData.data.data);
                 
                 alert(sendData.data.msg)

                  setDescription("")
                  setPhone("")
                  setAddress("")
              
                  setTypeStore("")
                  setEstimatedDeliveryTime("")
                  setName("")
                 setImage(null)
                 setPreview(null)
      
             }catch(error){
              alert("فشلت عملية الاضافة")
             }
      
      
          }


  return (
    <div className=' CreateUser d-flex justify-content-between col-12  ' >
        <div className=' col-8 col-md-3 col-lg-2 said' ><SaidSuper/></div>
        <div className=' col-12  col-lg-10 d-flex align-items-center justify-content-center ' ><StoreForm
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
        setTIsActive={setTIsActive}
        typeStore={typeStore}
        typeStores={typeStores}
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
        Apply={addStore}

        /></div>
      
    </div>
  )
}

export default AddStores
