import React, { useEffect, useState } from 'react'
import SaidAdmin from '../../../Components/Layout/SaidAdmin'
import axios from 'axios'
import { Link } from 'react-router-dom'

const CurrentOffer = () => {
  const [products,setProducts]=useState([])
  const [keyword,setKeyword]=useState("")
  const [activeCategory,setActiveCategory]=useState("all")
  const [categores,setCategores]=useState([])
  const [result,setResult]=useState(0)
  const URL='https://talabatak-ebon.vercel.app'
  

  const getProducts=async()=>{
      
              try{

                if(keyword!==''){
                   const getData=await axios.get(`${URL}/api/product?keyword=${keyword}`,{headers: { "Content-Type": "application/json"} })
                   const resData=getData.data.data
                    setProducts(resData)
                    setResult(getData.data.result)

                }else{
                   const getData=await axios.get(`${URL}/api/product?keyword=$`,{headers: { "Content-Type": "application/json"} })  
                   const resData=getData.data.data
                    setProducts(resData)
                    setResult(getData.data.result)

                }

           
      
              }catch(error){
                  alert("خطأ في جلب البيانات")
      
              }
      
         }
  const getCategorys=async()=>{
                
                        try{
                      const getData=await axios.get(`${URL}/api/category`,{headers: { "Content-Type": "application/json"} })  
                      const resData=getData.data.data
                      console.log(resData);

                      setCategores(resData)
                     
                
                        }catch(error){
                            alert("خطأ في جلب البيانات")
                
                        }
                
          }
  const fetchData=async(categoryId)=>{
                
       try{
        setActiveCategory(categoryId)

         if(categoryId!=="all"){
          const getData=await axios.get(`${URL}/api/category/${categoryId}/product`,{headers: { "Content-Type": "application/json"} })  
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
    <div className=' CreateUser CurrentItems CurrentOffer d-flex justify-content-between col-12  ' >
                <div className=' col-8 col-md-4 col-lg-2 said  ' ><SaidAdmin/></div>
                <div className=' col-12 col-md-8 col-lg-10 d-flex flex-column align-items-center ' >

                  <div className='boxSearch mt-3 col-12 col-md-11 col-lg-8  py-3 d-flex justify-content-between align-items-center ' >
                    <input type='search'  value={keyword} onChange={(e)=>setKeyword(e.target.value)}  className='py-2 mx-2 col-lg-4 col-7 text-center ' placeholder='ابحث هنا...' />
                  <Link to={`/admin/addOffer`} className='btn mx-2 py-2' >اضافة عرض <i className='fa-solid fa-plus' ></i></Link></div>
                  <div className='categoryBtns mt-3 col-12 col-md-11 col-lg-8  d-flex justify-content-center align-items-center ' >
                    <button  onClick={()=>fetchData("all")} className={`btn py-3 px-5 mx-2 ${activeCategory==='all'?"active":""} ` } >الكل</button>
                    {categores.map((item)=>{
                      return(
                        <button className='btn d-flex justify-content-center py-3 px-5 mx-2 col-5 my-2 col-md-4 col-lg-2 ' onClick={()=>fetchData(item._id)} >{item.name}</button>
                      )
                    })}
                  </div>
                  <hr></hr>
                  <h5 className=' mb-2 mx-2 fw-bold col-11 d-flex justify-content-left ' >العروض الحالية: {result}</h5>
    
                  <div className='   boxOffers d-flex justify-content-center  col-md-11 col-lg-10  ' >
                   {products.map((item)=>{
                    return(
                       <div className=' item my-2 mx-2 d-flex flex-column col-11 col-md-5 col-lg-3' >
                        <img src={item.image} />
                      <div className='banner d-flex justify-content-between col-12 ' >
                          <span className={`px-3 p-1 fw-bold  text-xs d-flex justify-content-center align-items-center ${item.isActive?"bg-success text-light":"bg-danger text-light"} `} >{item.isActive?"متوفر":"غير متوفر"}</span>
                          <span className={`px-3 p-1 fw-bold  text-xs d-flex justify-content-center align-items-center ${item.priceAfterDiscount?"bg-success text-light":"bg-light text-light"} `} >{item.priceAfterDiscount?"عرض خاص":""}</span>
                        </div>
                        <div className='info d-flex flex-column ' >
                          <h5 className='fw-bold mb-0 mt-1 py-0 mx-2 ' >{item.name}</h5>
                           <div className=' d-flex d-flex justify-content-between my-0 mt-2 py-0 mx-2  ' ><p className='fw-bold' >{item.category.name}</p><p className='fw-bold' >{item.priceAfterDiscount}ج.م بدلا من{item.price}ج.م </p></div>
                           <div className=' d-flex d-flex justify-content-between my-1 py-0 mx-2 ' ><Link to={`/admin/updateOffer/${item._id}`} className='px-3 py-1 fw-bold ' >تعديل</Link> <Link to={`/admin/deleteOffer/${item._id}`}  className='px-3 py-1 fw-bold ' >حذف</Link> </div>
                        </div>
                        
                        

                    </div>
                    )
                   })}


                  </div>

                  
                </div>
              
            </div>
  )
}

export default CurrentOffer
