import React from 'react'

const TypeStoreForm = ({preview,setPreview,fileInputRef,handleFileChange,name,setName,typeStores,title,btnTitle,apply,label}) => {

  
  return (
    <div className='col-12 d-flex justify-content-center ' >

      <div className=' TypeStoreForm col-11 col-md-12 col-lg-10' >
                    <form className=' d-flex align-items-center flex-column col-12   ' >

                    <div className='d-flex justify-content-center mx-2 align-items-center col-12 ' ><h5 className='my-4 fw-bold align-items-center ' >{title}</h5></div>
           
                     <div className='d-flex flex-column align-items-center fw-bold col-12 ' ><label>{label}</label><input type='text' className=' d-flex col-10 py-2 mt-2  text-center ' value={name} onChange={(e)=>setName(e.target.value)}   /></div>

                    <div className=' d-flex col-11 py-5   ' >
                         <div className=' d-flex col-12 justify-content-center orang-box align-items-center '  onClick={()=>fileInputRef.current.click()} >
                        {preview?(
                            <img src={preview} style={{width:"100%",height:"220px"}} />
                        ):(<h5 className='fw-bold text-light ' >اختر الصورة</h5>)}
                     </div>
                     <input type='file' id='fileInput' ref={fileInputRef} onChange={handleFileChange} />
                    </div>
                     <button  className='btn col-8 mt-2 mb-3 py-2 ' type='button' onClick={()=>apply()}  >{btnTitle}</button>
  
            

                </form>
                </div>
      
    </div>
  )
}

export default TypeStoreForm
