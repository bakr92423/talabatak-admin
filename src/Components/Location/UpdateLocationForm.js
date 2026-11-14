import React from 'react'

const UpdateLocationForm = ({title,btnTitle,name,setName,price,setPrice,apply,select,setSelect,locations,nameLabel,selectLabel}) => {
  return (
    <div>
                        <form className=' d-flex align-items-center flex-column col-12   ' >

                    <div className='d-flex justify-content-center mx-2 align-items-center col-12 ' ><h5 className='my-4 fw-bold align-items-center ' >{title}</h5></div>
           
                     <div className='d-flex flex-column align-items-center fw-bold col-12 ' ><label className='my-1' > {selectLabel}</label><select className='col-10' value={select} onChange={(e)=>setSelect(e.target.value)} > 
                       <option value="" >اختر الموقع</option>
                      {locations.map((item)=>{
                        return(
                          <option value={item._id} >{item.name}</option>
                        )
                      })}

                      </select></div>
                     <div className='d-flex flex-column align-items-center fw-bold col-12 mt-3' ><label> {nameLabel}</label><input type='text' className=' d-flex col-10 py-2 mt-2  text-center ' value={name} onChange={(e)=>setName(e.target.value)}   /></div>
                     <div className='d-flex flex-column align-items-center fw-bold col-12 mt-3 ' ><label>  السعر</label><input type='Number' className=' d-flex col-10 py-2 mt-2  text-center ' value={price} onChange={(e)=>setPrice(e.target.value)}   /></div>

                     <button  className='btn col-8 mt-2 mb-3 py-2 mt-5 ' type='button' onClick={()=>apply()}  >{btnTitle}</button>
  
            

                </form>
    </div>
  )
}

export default UpdateLocationForm
