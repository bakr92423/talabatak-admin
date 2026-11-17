import React, { useEffect, useReducer, useRef, useState } from 'react'
import SaidAdmin from '../../../Components/Layout/SaidAdmin'
import ItemForm from '../../../Components/Admin/Menu/ItemForm'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateItem = () => {
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

    // الجديد: الأحجام
    const [hasVariants,setHasVariants]=useState(false)
    const [variants,setVariants]=useState([])

    const handleFileChange=(e)=>{
         const file=e.target.files[0]
              if(file){
                  setImage(file)
                  const url=URL.createObjectURL(file)
                  setPreview(url)
              }
          }
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

    const getCategorys=async()=>{
             try{
                    const ownerId = getUserIdFromToken()
                 if (!ownerId) return
                    const getData=await axios.get(`${URLSITE}/api/category/owner/${ownerId}`,{headers: { "Content-Type": "application/json"} })  
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
                    setPriceAfterDiscount(resData.priceAfterDiscount)
                    setOldImage(resData.image)
                    setIsActive(resData.isActive)
                    setCategory(resData.category._id||resData.category)
                    setPreview(resData.image)

                    // الجديد: حمل الأحجام لو موجودة
                    if(resData.variants && resData.variants.length > 0){
                      setHasVariants(true)
                      setVariants(resData.variants.map(v=>({
                        size: v.size || "",
                        price: v.price || "",
                        discount: v.discount || 0,
                        priceAfterDiscount: v.priceAfterDiscount || v.price || ""
                      })))
                    } else {
                      setHasVariants(false)
                      setVariants([])
                    }
              
                      }catch(error){
                          alert("خطأ في جلب البيانات")
              
                      }
              
        }

        useEffect(()=>{
            getCategorys()

        },[])
        useEffect(()=>{
            getItems()

        },[id])

    const updateVariant = (index, field, value) => {
      const copy = [...variants]
      copy[index][field] = value
      // لو غير السعر أو الخصم، احسب السعر بعد الخصم تلقائي
      if(field === 'price' || field === 'discount'){
        const p = Number(copy[index].price || 0)
        const d = Number(copy[index].discount || 0)
        copy[index].priceAfterDiscount = Math.round(p - (p * d / 100))
      }
      setVariants(copy)
    }

    const addVariant = () => {
      setVariants([...variants, { size:"", price:"", discount:0, priceAfterDiscount:"" }])
    }

    const removeVariant = (index) => {
      setVariants(variants.filter((_,i)=> i !== index))
    }

    const updateItem=async()=>{
                
        try{
                
         let imageUrl=oldImage

              if(image){
              const formData= new FormData()
              formData.append("image",image)
              formData.append("name",name)
              const sendImage= await axios.post(`${URLSITE}/api/upload`,formData,{ headers: { "Content-Type": "multipart/form-data" } })
               imageUrl=sendImage.data.imageUrl
                console.log(imageUrl);
              }
                
             const data={
              name,
             description,
             image:imageUrl,
             price,
             priceAfterDiscount,
             store:storeId,
             isActive,
             category,
             // الجديد: ابعت الأحجام
             hasVariants,
             variants: hasVariants ? variants.map(v=>({
               size: v.size,
               price: Number(v.price),
               discount: Number(v.discount || 0),
               priceAfterDiscount: Number(v.priceAfterDiscount || v.price)
             })) : [],
             }
         const sendData= await axios.patch(`${URLSITE}/api/product/${id}`,data,{headers: { "Content-Type": "application/json"} })
          console.log(sendData,"sendData");
                         
              
             if(sendData.data.errors){
              return alert(sendData.data.errors[0].msg)
             }
                           console.log(sendData.data.data);
                           
                           alert(sendData.data.msg)
                           navigate("/admin/currentItems")
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
                <div className='col-12 d-flex flex-column justify-content-center align-items-center mt-5 ' >
                <ItemForm
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
                />

                {/* قسم الأحجام - تعديل */}
                <div className='col-11 col-md-8 bg-white p-3 rounded shadow-sm mt-3 mb-4'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <h6 className='fw-bold mb-0'>هل الصنف ليه أحجام؟</h6>
                    <div className='form-check form-switch'>
                      <input className='form-check-input' type='checkbox' checked={hasVariants} onChange={(e)=>{ setHasVariants(e.target.checked); if(e.target.checked && variants.length===0) addVariant() }} />
                    </div>
                  </div>

                  {hasVariants && (
                    <div className='mt-3'>
                      {variants.map((v,i)=>(
                        <div key={i} className='d-flex gap-2 align-items-end mb-2 flex-wrap'>
                          <div className='flex-grow-1'>
                            <label className='small'>الحجم</label>
                            <input className='form-control' placeholder='مثال: كبير' value={v.size} onChange={(e)=>updateVariant(i,'size',e.target.value)} />
                          </div>
                          <div>
                            <label className='small'>السعر</label>
                            <input className='form-control' type='number' value={v.price} onChange={(e)=>updateVariant(i,'price',e.target.value)} />
                          </div>
                          <div>
                            <label className='small'>خصم %</label>
                            <input className='form-control' type='number' value={v.discount} onChange={(e)=>updateVariant(i,'discount',e.target.value)} />
                          </div>
                          <div>
                            <label className='small'>بعد الخصم</label>
                            <input className='form-control' type='number' value={v.priceAfterDiscount} readOnly />
                          </div>
                          <button type='button' className='btn btn-danger btn-sm' onClick={()=>removeVariant(i)}>x</button>
                        </div>
                      ))}
                      <button type='button' className='btn btn-outline-primary btn-sm mt-2' onClick={addVariant}>+ إضافة حجم</button>
                      <p className='text-muted small mt-2'>متنساش تدوس تعديل تحت عشان يتحفظ.</p>
                    </div>
                  )}
                </div>
                </div>
    
            </div>
    
          
        </div>
  )
}

export default UpdateItem

