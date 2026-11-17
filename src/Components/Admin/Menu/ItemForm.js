import React from 'react'
import { Link } from 'react-router-dom'

const ItemForm = ({icon,title,btnTitle,name,setName,description,setDescription,price,setPrice,priceAfterDiscount,setPriceAfterDiscount
   ,store,stores,setStore,isActive,setIsActive,category,categores,setCategory,image,setImage,preview,setPreview,fileInputRef,handleFileChange,apply,hasVariants}) => {
  return (
    <div className=' ItemForm col-10 col-md-11 mt-4 d-flex justify-content-between ' >
         <div className='col-12 d-flex justify-content-between  ' >
         <h5 className=' my-2 fw-bold mx-2 ' >{title}</h5>
            <Link to={`/admin/currentItems`} className='fa-solid fa-xmark mb-3 d-flex align-self-end align-items-center justify-content-center fw-bold text-light ' ></Link>
         </div>
         <hr></hr>
        <form className='d-flex col-12' >
 
            <div className='col-12 col-md-7 col-lg-5 flex-column mx-1' >
                 <div className='d-flex flex-column align-items-center fw-bold col-12 my-3 mt-5 ' >
                <label> اسم الصنف</label>
             <input type='text' className=' d-flex col-10 py-2 mt-2  text-center ' value={name} onChange={(e)=>setName(e.target.value)}   />
             </div>

             {!hasVariants ? (
               <div className='d-flex flex-column align-items-center fw-bold col-12 my-3 ' >
                  <label>السعر</label>
               <input type='Number' className=' d-flex col-10 py-2 mt-2  text-center ' value={price} onChange={(e)=>setPrice(e.target.value)}   />
               </div>
             ) : (
               <div className='d-flex flex-column align-items-center fw-bold col-12 my-3 ' >
                  <div className='col-10 py-2 mt-2 text-center rounded' style={{background:'#f0fdf4', color:'#15803d', fontSize:'14px'}}>
                    السعر هيتاخد من الأحجام اللي فوق
                  </div>
               </div>
             )}

             <div className='d-flex flex-column align-items-center fw-bold col-12 my-3 ' >
                <label>القسم</label>
             <select className='col-10 py-2 pt-2 mt-1 ' value={category} onChange={(e)=>setCategory(e.target.value)} >
                <option>اختر القسم</option>
                {categores.map((item)=>{
                   return(
                     <option key={item._id} value={item._id} >{item.name}</option>
                  )
                })}
             </select>
             </div>
             <div className='d-flex flex-column align-items-center fw-bold col-12 my-3 ' >
                <label>الحالة</label>
             <select className='col-10 py-2 pt-2 mt-1 ' value={isActive} onChange={(e)=>setIsActive(e.target.value)} >
                <option value={true} >متوفر</option>
                <option value={false} >غير متوفر</option>
             </select>
             </div>
             <div className='d-flex flex-column align-items-center fw-bold col-12 my-3 ' >
                <label>الوصف</label>
             <input type='text' className=' d-flex col-10 py-4 mt-2  text-center ' value={description} onChange={(e)=>setDescription(e.target.value)}   />
             </div>
            </div>
           
              <div className=' d-flex flex-column align-items-center col-11 col-md-4 col-lg-5   ' >
            <h6 className='fw-bold mt-5 ' >صورة الصنف</h6>
             <div className=' d-flex col-8 justify-content-center orang-box align-items-center py-5 '  onClick={()=>fileInputRef.current.click()} >
                                {preview?(
                       <img src={preview} style={{width:"100%",height:"150%"}} alt="preview" />
                  ):(<h5 className='fw-bold text-light ' >اختر صورة الصنف <i className='fa-solid fa-cloud-arrow-up' ></i></h5>)}
                </div>
                <input type='file' id='fileInput' ref={fileInputRef} onChange={handleFileChange} />
              </div>

        </form>
         <div className='col-12 d-flex justify-content-center my-4 ' ><button type='button' className='btn fw-bold col-11 col-md-5 mt-2 col-lg-3  ' onClick={()=>apply()} >{btnTitle} <i className={`fa-solid ${icon} `} ></i> </button></div>
    </div>
  )
}

export default ItemForm
