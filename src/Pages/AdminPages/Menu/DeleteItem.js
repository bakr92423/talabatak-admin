import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SaidAdmin from '../../../Components/Layout/SaidAdmin'
import ItemForm from '../../../Components/Admin/Menu/ItemForm'

const DeleteItem = () => {
    const icon='fa-trash'
    const title="حذف صنف "
    const btnTitle="حذف"
    const [name,setName]=useState()
    const [description,setDescription]=useState()
    const [price,setPrice]=useState()
    const [priceAfterDiscount,setPriceAfterDiscount]=useState()
    const [store,setStore]=useState()
    const [oldImage,setOldImage]=useState()
    const [categores,setCategores]=useState([])
    const [isActive,setIsActive]=useState()
    const [category,setCategory]=useState()
    const [image,setImage]=useState(null)
    const [preview,setPreview]=useState(null)
    const fileInputRef=useRef(null)
    const navigate=useNavigate()
    const storeId=JSON.parse(localStorage.getItem("storeId"))
     const URLSITE='https://talabatak-ebon.vercel.app'
    const{id}=useParams()
    const handleFileChange=(e)=>{
         const file=e.target.files[0]
              if(file){
                  setImage(file)
                  const url=URL.createObjectURL(file)
                  setPreview(url)
              }
          }


    const getCategorys=async()=>{
                  
                          try{
                        const getData=await axios.get(`${URLSITE}/api/category`,{headers: { "Content-Type": "application/json"} })  
                        const resData=getData.data.data
                        
                        setCategores(resData)
                  
                          }catch(error){
                              alert("خطأ في جلب البيانات")
                  
                          }
                  
            }
     const getItems=async()=>{
                  
                          try{
                        const getData=await axios.get(`${URLSITE}/api/product/${id}`,{headers: { "Content-Type": "application/json"} })  
                        const resData=getData.data.data
                        setName(resData.name)
                        setDescription(resData.description)
                        setPrice(resData.price)
                        setOldImage(resData.image)
                        setIsActive(resData.isActive)
                        setCategory(resData.category._id||resData.category)
                        setPreview(resData.image)
    
                        
                  
                          }catch(error){
                              alert("خطأ في جلب البيانات")
                  
                          }
                  
            }


      useEffect(()=>{
           getCategorys()
            
        },[])
         useEffect((id)=>{
               getItems()
            
            },[id])



     const deleteItem=async()=>{
      
             try{


              const sendData= await axios.delete(`${URLSITE}/api/product/${id}`,{headers: { "Content-Type": "application/json"} })
                console.log(sendData,"sendData");
                
      
                  if(sendData.data.errors){
                  return alert(sendData.data.errors[0].msg)
                 }
                 console.log(sendData.data.data);
                 
                 alert(sendData.data.msg)
                 navigate("/admin/currentItems")

      
             }catch(error){
              alert(error.msg,"فشلت عملية الحذف")
             }
      
      
          }
  return (
   <div className='AddItem DeleteItem col-12 d-flex justify-content-between ' >
               <div className='col-8 col-md-3 said col-lg-2' ><SaidAdmin/></div>
               <div className='  col-12 col-md-9 col-lg-10  ' >
                   <div className='col-12 d-flex justify-content-center align-items-center mt-5 ' ><ItemForm
                   icon={icon}
                   title={title}
                   btnTitle={btnTitle}
                   name={name}
                   setName={setName}
                   description={description}
                   setDescription={setDescription}
                   price={price}
                   setPrice={setPrice}
                   priceAfterDiscount={priceAfterDiscount}
                   setPriceAfterDiscount={setPriceAfterDiscount}
                   setStore={setStore}
                   isActive={isActive}
                   setIsActive={setIsActive}
                   category={category}
                   categores={categores}
                   setCategory={setCategory}
                   image={image}
                   setImage={setImage}
                   preview={preview}
                   setPreview={setPreview}
                   fileInputRef={fileInputRef}
                   handleFileChange={handleFileChange}
                   apply={deleteItem}
       
       
                   /></div>
       
               </div>
       
             
           </div>
  )
}

export default DeleteItem
