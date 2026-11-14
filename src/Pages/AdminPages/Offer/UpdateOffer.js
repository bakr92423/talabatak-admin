import React, { useEffect, useReducer, useRef, useState } from 'react'
import SaidAdmin from '../../../Components/Layout/SaidAdmin'
import ItemForm from '../../../Components/Admin/Menu/ItemForm'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import OfferForm from '../../../Components/Admin/Offer/OfferForm'

const UpdateOffer = () => {
        const icon='fa-pen'
    const title="تعديل صنف "
    const btnTitle="تعديل"
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
                    setPriceAfterDiscount(resData.priceAfterDiscount)

                    
              
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

    const updateItem=async()=>{
                
        try{
                
          let imageUrl=oldImage

              if(image){
              const formData= new FormData()
              formData.append("image",image)
              formData.append("name",name)
              const sendImage= await axios.post(`http://localhost:9000/api/upload`,formData,{ headers: { "Content-Type": "multipart/form-data" } })
               imageUrl=sendImage.data.imageUrl
                console.log(imageUrl);
              }
                
             const data={
              name,
             description,
             image:imageUrl,
             price,
             store:storeId,
             isActive,
             category,
             priceAfterDiscount
          
             }
         const sendData= await axios.patch(`${URLSITE}/api/product/${id}`,data,{headers: { "Content-Type": "application/json"} })
          console.log(sendData,"sendData");
                          
                
             if(sendData.data.errors){
              return alert(sendData.data.errors[0].msg)
             }
                           console.log(sendData.data.data);
                           
                           alert(sendData.data.msg)
                           navigate("/admin/currentOffer")
                            setDescription("")
                            setName("")
                           setImage(null)
                           setPreview(null)
                           setPrice("")
                           setPriceAfterDiscount("")
                           setStore("")
                           setIsActive("")
                           setCategory("")

                
                       }catch(error){
                        alert("فشلت عملية التحديث")
                       }
                
                
            }
  return (
      <div className='AddItem UpdateItem col-12 d-flex justify-content-between ' >
            <div className='col-8 col-md-3 said col-lg-2' ><SaidAdmin/></div>
            <div className='  col-12 col-md-9 col-lg-10  ' >
                <div className='col-12 d-flex justify-content-center align-items-center mt-5 ' ><OfferForm
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
                apply={updateItem}
    
    
                /></div>
    
            </div>
    
          
        </div>
  )
}

export default UpdateOffer
