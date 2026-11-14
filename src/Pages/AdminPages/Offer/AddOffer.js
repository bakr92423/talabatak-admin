import React, { useEffect, useRef, useState } from 'react'
import SaidAdmin from '../../../Components/Layout/SaidAdmin'
import ItemForm from '../../../Components/Admin/Menu/ItemForm'
import axios from 'axios'
import OfferForm from '../../../Components/Admin/Offer/OfferForm'

const AddOffer = () => {
    const icon='fa-plus'
    const title="اضافة عرض جديد"
    const btnTitle="اضافة"
    const [name,setName]=useState()
    const [description,setDescription]=useState()
    const [price,setPrice]=useState()
    const [priceAfterDiscount,setPriceAfterDiscount]=useState()
    const [store,setStore]=useState()
    const [stores,setStores]=useState([])
    const [categores,setCategores]=useState([])
    const [isActive,setIsActive]=useState()
    const [category,setCategory]=useState()
    const [image,setImage]=useState(null)
    const [preview,setPreview]=useState(null)
    const fileInputRef=useRef(null)
    const storeId=JSON.parse(localStorage.getItem("storeId"))
    const URLSITE='https://talabatak-ebon.vercel.app'
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


        useEffect(()=>{
            getCategorys()

        },[])

    const addItem=async()=>{
                
        try{
                
         const formData= new FormData()
         formData.append("image",image)
        formData.append("name",name)
         const sendImage= await axios.post(`${URLSITE}/api/upload`,formData,{ headers: { "Content-Type": "multipart/form-data" } })
         const imageUrl=sendImage.data.imageUrl
             console.log(imageUrl);
                
             const data={
              name,
             description,
             image:imageUrl,
             price,
             priceAfterDiscount,
             store:storeId,
             isActive,
             category,
          
             }
         const sendData= await axios.post(`${URLSITE}/api/product`,data,{headers: { "Content-Type": "application/json"} })
          console.log(sendData,"sendData");
                          
                
             if(sendData.data.errors){
              return alert(sendData.data.errors[0].msg)
             }
                           console.log(sendData.data.data);
                           
                           alert(sendData.data.msg)
          
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
                        alert("فشلت عملية الاضافة")
                       }
                
                
            }

    
  return (
    <div className='AddItem col-12 d-flex justify-content-between ' >
        <div className='col-8 col-md-4 said col-lg-2' ><SaidAdmin/></div>
        <div className='  col-12 col-md-8 col-lg-10  ' >
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
            store={store}
            stores={stores}
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
            apply={addItem}


            /></div>

        </div>

      
    </div>
  )
}

export default AddOffer
