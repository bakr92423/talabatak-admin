import React, { useEffect, useState } from 'react'
import SaidAdmin from '../../../Components/Layout/SaidAdmin'
import axios from 'axios'
import { Link } from 'react-router-dom'

const CurrentItems = () => {
  const [products,setProducts]=useState([])
  const [keyword,setKeyword]=useState("")
  const [activeCategory,setActiveCategory]=useState("all")
  const [categores,setCategores]=useState([])
  const [result,setResult]=useState(0)
  const URLSITE='https://talabatak-ebon.vercel.app'
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

  const getProducts=async()=>{
      
              try{
                 let id = getUserIdFromToken()
                 if (!id) return

                if(keyword!==''){
                   const getData=await axios.get(`${URLSITE}/api/product?keyword=${keyword}`,{headers: { "Content-Type": "application/json"} })
                   const resData=getData.data.data
                   console.log(resData,"pro");
                   
                    setProducts(resData)
                    setResult(getData.data.result)

                }else{
                   const getData=await axios.get(`${URLSITE}/api/product?owner=${id}`,{headers: { "Content-Type": "application/json"} })  
                   const resData=getData.data.data
                   console.log(resData,"pro");
                   console.log(id,"ownerId");
                    setProducts(resData)
                    setResult(getData.data.result)

                }

           
      
              }catch(error){
                  alert("خطأ في جلب البيانات")
      
              }
      
         }
  const getCategorys=async()=>{
    
                
                        try{
                           const ownerId = getUserIdFromToken()
                         if (!ownerId) return
                      const getData=await axios.get(`${URLSITE}/api/category/owner/${ownerId}`,{headers: { "Content-Type": "application/json"} })  
                      const resData=getData.data.data
                      console.log(resData,"cat");

                      setCategores(resData)
                     
                
                        }catch(error){
                            alert("خطأ في جلب البيانات")
                
                        }
                
          }
  const fetchData=async(categoryId)=>{
                
       try{
        setActiveCategory(categoryId)

         if(categoryId!=="all"){
          const getData=await axios.get(`${URLSITE}/api/category/${categoryId}/product`,{headers: { "Content-Type": "application/json"} })  
          const resData=getData.data.data 
          setProducts(resData)
          setResult(getData.data.result)

        }else{
          getProducts()
        }

          

            }catch(error){
                 alert("خطأ في جلب البيانات")
                
            }
                
          }

    useEffect(()=>{
        getCategorys()
    
      },[])

    useEffect(()=>{
      getProducts()
    },[keyword])

  return (
    <div className=' CreateUser CurrentItems d-flex justify-content-between col-12 mt-4  ' >
                <div className=' col-8 col-md-4 col-lg-2 said mt-1 ' ><SaidAdmin/></div>
                <div className=' col-12 col-md-8 col-lg-10 d-flex flex-column align-items-center mt-3 ' >

                  <div className='boxSearch mt-3 col-12 col-md-11 col-lg-8  mt-3 py-3 d-flex justify-content-between align-items-center ' >
                    <input type='search'  value={keyword} onChange={(e)=>setKeyword(e.target.value)}  className='py-2 mx-2 col-lg-4 col-7 text-center ' placeholder='ابحث هنا...' />
                  <Link to={`/admin/addItem`} className='btn mx-2 py-2' >اضافة صنف <i className='fa-solid fa-plus' ></i></Link></div>
                  <div className='categoryBtns mt-3 col-12 col-md-11 col-lg-8   d-flex justify-content-center align-items-center ' >
                    <button  onClick={()=>fetchData("all")} className={`btn py-3 px-5 mx-2 ${activeCategory==='all'?"active":""} ` } >الكل</button>
                    {categores.map((item)=>{
                      return(
                        <button className='btn d-flex justify-content-center py-3 px-5 mx-2 col-5 my-2 col-md-4 col-lg-2 ' onClick={()=>fetchData(item._id)} >{item.name}</button>
                      )
                    })}
                  </div>
                  <hr></hr>
                  <h5 className='my-2 mx-2 fw-bold col-11 d-flex justify-content-left ' >الاصناف الحالية : {result}</h5>
    
                 <div className='boxItems d-flex justify-content-center col-md-11 col-lg-10'>
  {products.map((item) => {
    return (
      <div className='item my-2 mx-2 d-flex flex-column col-11 col-md-5 col-lg-3' key={item._id}>
        <img src={item.image} />
        <span className={`item-status px-3 p-1 fw-bold text-xs d-flex justify-content-center align-items-center ${item.isActive ? "bg-success text-light" : "bg-danger text-light"}`}>
          {item.isActive ? "متوفر" : "غير متوفر"}
        </span>

        <div className='info d-flex flex-column' style={{ flex: 1 }}>
          <h5 className='fw-bold mb-0 mt-1 py-0 mx-2'>{item.name}</h5>

          <div className='d-flex justify-content-between my-1 py-0 mx-2'>
            <p className='fw-bold'>{item.category?.name}</p>
            <p className='fw-bold'>{item.variants?.length > 0 ? `من ${Math.min(...item.variants.map(v => Number(v.priceAfterDiscount || v.price)))} ج.م` : `${item.price}ج.م`}</p>
          </div>

          {/* الأحجام */}
          {item.variants?.length > 0 && (
            <div className='d-flex justify-content-center flex-wrap py-1 gap-1 mx-2 mb-2' dir="rtl">
              {item.variants.map((v, i) => (
                <span key={i} className='badge bg-light text-dark border px-2 py-1 sizeSpan' style={{ fontSize: '12px', whiteSpace: 'nowrap' }}>
                  {v.size} : {v.priceAfterDiscount || v.price} ج.م
                  {v.discount > 0 && <span className='text-danger'> - خصم {v.discount}%</span>}
                </span>
              ))}
            </div>
          )}

          {/* الزراير - آخر حاجة تحت */}
          <div className='d-flex justify-content-between my-1 py-0 mx-2' style={{ marginTop: 'auto', paddingTop: '8px' }}>
            <Link to={`/admin/updateItem/${item._id}`} className='px-3 py-1 fw-bold'>تعديل</Link>
            <Link to={`/admin/deleteItem/${item._id}`} className='px-3 py-1 fw-bold'>حذف</Link>
          </div>
        </div>
      </div>
    )
  })}
</div>

                  
                </div>
              
            </div>
  )
}

export default CurrentItems

