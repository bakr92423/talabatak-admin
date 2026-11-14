import React from 'react'

const DisableUserForm = ({btnTitle,title,name,setName,userID,setUserID,role,setRole,store,setStore,password,setPassword,apply,stores}) => {
  return (
    <form className='col-11 col-md-3 d-flex align-items-center  flex-column  ' >
                <h4 className='mt-3 fw-bold d-flex justify-content-center ' >{title}</h4>

                <input type='text' className='my-2 col-11 '  placeholder='اسم المستخدم' value={name} onChange={(e)=>setName(e.target.value)} />
                <input type='text' className='my-2 col-11 '  placeholder='كود المستخدم ' value={userID} onChange={(e)=>setUserID(e.target.value)} />
                <select className='my-2 col-11 ' value={role} onChange={(e)=>setStore(e.target.value)} >
                    <option>اختر الصلاحية</option>
                    <option>super</option>
                    <option>admin</option>
                </select>
                <select className='my-2 col-11 ' value={store} onChange={(e)=>setStore(e.target.value)} >
                    <option>اختر المتجر</option>
                     {stores.map((item)=>{
                      return(

                        <option value={item._id} >{item.name}</option>
                      )
                    })}
                </select>
                <input type='password' className='my-2 col-11 '  placeholder='كلمة المرور' value="******"  />
                <input type='password' className='my-2 col-11 '  placeholder=' ادخل كلمة المرور الحديثة' value={password} onChange={(e)=>setPassword(e.target.value)}  />

                <button className='my-2 col-11 btn ' type='button' onClick={()=>apply()} >{btnTitle}</button>

            </form>
  )
}

export default DisableUserForm
