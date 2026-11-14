import React from 'react'
import { Link } from 'react-router-dom'

const StoreForm = ({name,setName,description,setDescription,phone,setPhone,address,setAddress,isActive,setIsActive,typeStore,title,btnTitle,icon,
  setTypeStore,image,setImage,estimatedDeliveryTime,setEstimatedDeliveryTime,preview,setPreview,fileInputRef,handleFileChange,Apply,typeStores}) => {
  return (
    <div className=' col-11 col-md-11 col-lg-10 StoreForm d-flex justify-content-center  ' >
      <form className='col-md-12 col-lg-10 d-flex flex-column justify-content-around' >
        <div className='col-lg-12 d-flex justify-content-between  '  ><h4 className='fw-bold mx-2 ' >{title}</h4> <Link to={"/superAdmin/currentStore"} className='fa-solid fa-xmark' ></Link> </div>
        <div className='col-lg-12 d-flex justify-content-around ' >
           <div className=' col-10 col-md-5 col-lg-5 d-flex flex-column text-center fw-bold  my-1 ' ><label>اسم المتجر</label><input type='text' className='py-2 my-1 ' value={name} onChange={(e)=>setName(e.target.value)} /></div>
           <div className=' col-10 col-md-5 col-lg-5 d-flex flex-column text-center fw-bold  my-1 ' ><label>الوصف</label><input type='text' className='py-2 my-1 ' value={description} onChange={(e)=>setDescription(e.target.value)} /></div>
        </div>
        <div className='col-lg-12 d-flex justify-content-around ' >
           <div className=' col-10 col-md-5 col-lg-5 d-flex flex-column text-center fw-bold  my-1 ' ><label>رقم الهاتف  <i className='fa-solid fa-phone' ></i> </label><input type='text' className='py-2 my-1 ' value={phone} onChange={(e)=>setPhone(e.target.value)} /></div>
           <div className=' col-10 col-md-5 col-lg-5 d-flex flex-column text-center fw-bold  my-1 ' ><label> العنوان  </label><input type='text'  className='py-2 my-1 ' value={address} onChange={(e)=>setAddress(e.target.value)} /></div>
        </div>
        <div className='col-lg-12 d-flex justify-content-around ' >
           <div className=' col-10 col-md-5 col-lg-5 d-flex flex-column text-center fw-bold  my-1 ' ><label>حالة المتجر</label>
           <select value={isActive} onChange={(e)=>setIsActive(e.target.value)}  >
            <option value="true" >نشط</option>
            <option value="false" >غير نشط</option>

           </select>
           </div>
           <div className=' col-10 col-md-5 col-lg-5 d-flex flex-column text-center fw-bold  my-1 ' ><label> نوع المتجر</label>
           <select className='py-2 text-center fw-bold my-1' value={typeStore} onChange={(e)=>setTypeStore(e.target.value)} >
             <option>اختر نوع المتجر</option>
            {typeStores.map((item)=>{
              return(
                <option value={item.name} >{item.name}</option>
              )
            })}
            </select></div>
        </div>
        <div className='col-lg-12 d-flex justify-content-around ' >
           <div className='col-lg-5 d-flex flex-column text-center fw-bold  my-1 ' >  <div className=' d-flex col-12 justify-content-center orang-box align-items-center  '  onClick={()=>fileInputRef.current.click()} >
                        {preview?(
                            <img src={preview} style={{width:"100%"}} />
                        ):(<h5 className='fw-bold text-light ' >اختر صورة المتجر <i className='fa-solid fa-cloud-arrow-up' ></i></h5>)}
                     </div>
                     <input type='file' id='fileInput' ref={fileInputRef} onChange={handleFileChange} /></div>
           <div className='col-lg-5 d-flex flex-column text-center fw-bold  my-1 ' ><label>وقت التوصيل <i className='fa-solid fa-clock' ></i> </label><input type='text' className='py-2 my-1 ' value={estimatedDeliveryTime} onChange={(e)=>setEstimatedDeliveryTime(e.target.value)} /></div>
        </div>
        <div className=' col-12 d-flex justify-content-center' ><button className='btn fw-bold py-3 col-3' type='button' onClick={()=>Apply()} >{btnTitle} <i className={`${icon}`} ></i> </button></div>
      </form>
      
    </div>
  )
}

export default StoreForm
