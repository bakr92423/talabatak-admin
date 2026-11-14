import React, { useEffect, useState } from 'react'
import SaidSuper from '../../Components/Layout/SaidSuper'
import { Link } from 'react-router-dom'
import axios from 'axios'


const CurrentStore = () => {

  const [stores,setStores]=useState([])
  const [keyword,setKeyword]=useState("")
  const [result,setResult]=useState(0)
  const URL='https://talabatak-ebon.vercel.app'

  const getData=async()=>{
      
              try{

                if(keyword!==''){
                   const getData=await axios.get(`${URL}/api/store?keyword=${keyword}`,{headers: { "Content-Type": "application/json"} })
                   const resData=getData.data.data
                    setStores(resData)
                    setResult(getData.data.result)

                }else{
                   const getData=await axios.get(`${URL}/api/store?showAll=true`,{headers: { "Content-Type": "application/json"} })  
                   const resData=getData.data.data
                    setStores(resData)
                    setResult(getData.data.result)

                }

           
      
              }catch(error){
                  alert("خطأ في جلب البيانات")
      
              }
      
            }
  
    useEffect(()=>{
        getData()
     },[keyword])
  return (
      <div className=' CreateUser d-flex justify-content-between col-12  ' >
            <div className=' col-8 col-md-4 col-lg-2 said  ' ><SaidSuper/></div>
            <div className=' col-12 col-md-8 col-lg-10 d-flex flex-column align-items-center ' >

              <div className='boxSearch mt-5 col-12 col-md-11 col-lg-10  mt-4 py-3 d-flex justify-content-center align-items-center ' ><input type='search'  value={keyword} onChange={(e)=>setKeyword(e.target.value)}  className='py-2 mx-2 col-lg-4 col-7 text-center ' placeholder='ابحث هنا...' />
              <Link to={`/superAdmin/addStore`} className='btn mx-2 py-2' >اضافة متجر <i className='fa-solid fa-plus' ></i></Link></div>
              <hr></hr>
              <h5 className='my-2 fw-bold ' >المتاجر الحالية : {result}</h5>

              <table className=' d-none d-md-table boxStores col-md-11   col-lg-10' >
                <thead className='Store d-flex   ' >
                  <tr className=' d-flex justify-content-around py-3 col-12 ' >
                    <td className='text-center fw-bold' >اسم المتجر</td>
                    <td className='text-center fw-bold' >العنوان</td>
                    <td className='text-center fw-bold' >الموبايل</td>
                    <td className='text-center fw-bold' >نوع المتجر</td>
                    <td className='text-center fw-bold' >الحالة</td>
                    <td className='text-center fw-bold' >الاجراءات</td>

                  </tr>
                  
                </thead>
                <tbody>
                  {stores.map((item)=>{
                    return(
                      <tr className=' d-flex justify-content-around py-3 col-12 ' >

                    <td className='text-center fw-bold' >{item.name}<i className='fa-solid fa-store mx-1  ' ></i></td>
                    <td className='text-center fw-bold' >{item.address}</td>
                    <td className='text-center fw-bold' >{item.phone}</td>
                    <td className='text-center fw-bold' >{item.typeStore}</td>
                    <td className='text-center fw-bold' ><span className={`px-3 py-1 rouded-full text-xs ml-2 ${item.isActive?"bg-success text-light":"bg-danger text-light"} `} >{item.isActive?"نشط":"غير نشط"}</span></td>
                    <td className='text-center fw-bold' ><Link to={`/superAdmin/updateStore/${item._id}`} className='mx-1' ><i className='fa-solid fa-pen-square text-success' ></i></Link> <Link to={`/superAdmin/deleteStore/${item._id}`} className='mx-1 p-1 ' ><i className='fa-solid fa-trash text-danger ' ></i></Link></td>

 
                  </tr>

                    )
                  })}
                  

                </tbody>
              </table>

              {stores.map((item)=>{
                return(
                  <div className=' col-11 my-2  d-block d-md-none boxStores    ' >
                <div className='Store miniBoxStores   ' >
                  <div className=' d-flex  align-items-center justify-content-around col-12   ' >
                    <i className='fa-solid fa-store d-flex  align-items-center justify-content-around ' ></i>
                    <div>
                       <h5 className='text-center fw-bold' > {item.name}</h5>
                    <p className='text-center fw-bold' >{item.address}<i className='fa-solid fa-location ' ></i> </p>
                    <p className='text-center fw-bold' >{item.phone}</p>
                    </div>
                     <p className='text-center fw-bold' ><span className={`px-3 py-1 rouded-full text-xs ml-2 ${item.isActive?"bg-success text-light":"bg-danger text-light"} `} >{item.isActive?"نشط":"غير نشط"}</span></p>
                     <div className='d-flex flex-column justify-content-between   ' ><Link to={`/superAdmin/updateStore/${item._id}`} className='fa-solid fa-pen mb-3' ></Link><Link to={`/superAdmin/deleteStore/${item._id}`} className='fa-solid fa-trash mt-5' ></Link></div>
                   

                  </div>

                </div>
              </div> 
                )
              })}
              
            </div>
          
        </div>
  )
}

export default CurrentStore












 