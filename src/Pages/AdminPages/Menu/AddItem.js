import React, { useEffect, useRef, useState } from 'react'
import SaidAdmin from '../../../Components/Layout/SaidAdmin'
import ItemForm from '../../../Components/Admin/Menu/ItemForm'
import axios from 'axios'

const AddItem = () => {
    const icon='fa-plus'
    const title="اضافة صنف جديد"
    const btnTitle="اضافة"
    const [name,setName]=useState()
    const [description,setDescription]=useState()
    const [price,setPrice]=useState()
    const [priceAfterDiscount,setPriceAfterDiscount]=useState()
    const [store,setStore]=useState()
    const [stores,setStores]=useState([])
    const [categores,setCategores]=useState([])
    const [isActive,setIsActive]=useState(true)
    const [category,setCategory]=useState()
    const [image,setImage]=useState(null)
    const [preview,setPreview]=useState(null)
    const URLSITE='https://talabatak-ebon.vercel.app'
    const fileInputRef=useRef(null)
    const storeId=JSON.parse(localStorage.getItem("storeId"))

    // الجديد: الأحجام
    const [hasVariants,setHasVariants]=useState(false)
    const [variants,setVariants]=useState([{ size: "", price: "" }])

    // === الجديد: ضغط الصورة قبل الرفع - عشان كوتة Cloudinary الفري ===
    // بيصغر أي صورة لـ 1200px كحد أقصى وبجودة 82%، من غير ما يبان فرق للزبون
    const compressImage = (file) => {
        return new Promise((resolve) => {
            // لو مش صورة، رجعها زي ما هي
            if (!file.type.startsWith('image/')) return resolve(file);

            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                const maxWidth = 1200;
                let { width, height } = img;
                // لو الصورة أصغر من 1200، سيبها زي ما هي
                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(img, 0, 0, width, height);
                canvas.toBlob((blob) => {
                    URL.revokeObjectURL(img.src);
                    if (!blob) return resolve(file);
                    const compressed = new File([blob], file.name.replace(/\.\w+$/, '.jpg'), { type: 'image/jpeg' });
                    console.log(`قبل الضغط: ${(file.size / 1024 / 1024).toFixed(2)} MB - بعد الضغط: ${(compressed.size / 1024).toFixed(0)} KB`);
                    resolve(compressed);
                }, 'image/jpeg', 0.82);
            };
            img.onerror = () => resolve(file);
        });
    };

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

        useEffect(()=>{
            getCategorys()
        },[])

    const addItem=async()=>{
        try{
         if(!image) return alert("اختر صورة الأول");
         if(!name) return alert("اكتب اسم الصنف");

         // === ضغط الصورة هنا قبل ما تتبعت للباك إند ===
         const compressedImage = await compressImage(image);

         const formData= new FormData()
         formData.append("image",compressedImage)
         formData.append("name",name)
         const sendImage= await axios.post(`${URLSITE}/api/upload`,formData,{ headers: { "Content-Type": "multipart/form-data" } })
         const imageUrl=sendImage.data.imageUrl
             console.log(imageUrl);
                
             // تجهيز الـ variants قبل الارسال
             let finalVariants = []
             if(hasVariants){
                finalVariants = variants.filter(v => v.size && v.price).map(v => ({
                    size: v.size,
                    price: Number(v.price),
                    priceAfterDiscount: v.priceAfterDiscount ? Number(v.priceAfterDiscount) : undefined
                }))
                if(finalVariants.length === 0){
                    return alert("اكتب حجم واحد على الأقل")
                }
             }

             const data={
              name,
              description,
              image:imageUrl,
              price: hasVariants ? undefined : price,
              priceAfterDiscount: hasVariants ? undefined : priceAfterDiscount,
              variants: finalVariants,
              store:storeId,
              isActive,
              category,
             }
         const sendData= await axios.post(`${URLSITE}/api/product`,data,{headers: { "Content-Type": "application/json"} })
          console.log(sendData,"sendData");
             if(sendData.data.errors){
              return alert(sendData.data.errors[0].msg)
             }
                           alert(sendData.data.msg)
                           setDescription("")
                           setName("")
                           setImage(null)
                           setPreview(null)
                           setPrice("")
                           setPriceAfterDiscount("")
                           setStore("")
                           setCategory("")
                           setHasVariants(false)
                           setVariants([{ size: "", price: "" }])
                           if(fileInputRef.current) fileInputRef.current.value = ""
                       }catch(error){
                        console.log(error);
                        alert("فشلت عملية الاضافة")
                       }
            }

  return (
    <div className='AddItem col-12 d-flex justify-content-between ' >
        <div className='col-8 col-md-4 said col-lg-2' ><SaidAdmin/></div>
        <div className='  col-12 col-md-8 col-lg-10 mt-2 ' >
            <div className='col-12 d-flex flex-column justify-content-center align-items-center mt-5 ' >

            {/* زرار الأحجام */}
            <div className='col-10 col-md-8 bg-white p-3 rounded shadow-sm mb-3' dir='rtl'>
                <label className='d-flex align-items-center gap-2 fw-bold' style={{cursor:'pointer'}}>
                    <input type="checkbox" checked={hasVariants} onChange={(e)=>setHasVariants(e.target.checked)} />
                    المنتج ليه أكتر من حجم؟ زي وسط وكبير
                </label>

                {hasVariants && (
                    <div className='mt-3'>
                        {variants.map((v, index)=>(
                            <div key={index} className='d-flex gap-2 mb-2'>
                                <input className='form-control' placeholder='الحجم - مثال: وسط' value={v.size} onChange={(e)=>{
                                    const copy=[...variants]
                                    copy[index].size=e.target.value
                                    setVariants(copy)
                                }} />
                                <input className='form-control' type='number' placeholder='السعر' value={v.price} onChange={(e)=>{
                                    const copy=[...variants]
                                    copy[index].price=e.target.value
                                    setVariants(copy)
                                }} />
                                <button className='btn btn-danger' onClick={()=>{
                                    if(variants.length===1) return
                                    setVariants(variants.filter((_,i)=>i!==index))
                                }}>x</button>
                            </div>
                        ))}
                        <button className='btn btn-outline-success btn-sm' onClick={()=>setVariants([...variants, {size:"", price:""}])}>+ أضف حجم</button>
                    </div>
                )}
            </div>

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
             hasVariants={hasVariants} 
            />
            </div>
        </div>
    </div>
  )
}

export default AddItem
