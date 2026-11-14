import React, { useEffect, useState } from 'react'
import SaidSuper from '../../Components/Layout/SaidSuper'
import LocationForm from '../../Components/Location/LocationForm'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import UpdateLocationForm from '../../Components/Location/UpdateLocationForm'

const DeleteLocation = () => {
    const title="حذف موقع"
    const btnTitle="حذف "
    const selectLabel="اختر الموقع المراد حذفة "
    const nameLabel="اسم الموقع "
    const [name,setName]=useState()
    const [price,setPrice]=useState()
    const [select,setSelect]=useState("")
    const [locations,setLocations]=useState([])
    const URL='https://talabatak-ebon.vercel.app'



            const getLocations=async()=>{
        
               try{

                const sendData= await axios.get(`${URL}/api/location`,{headers: { "Content-Type": "application/json"} })
                const resData=sendData.data.data
                  setLocations(resData)
        
               }catch(error){
                alert("فشلت عملية الجلب")
               }
        
        
            }
            const getLocation=async()=>{
        
               try{

                const sendData= await axios.get(`${URL}/api/location/${select}`,{headers: { "Content-Type": "application/json"} })
                const resData=sendData.data.data
                  setName(resData.name)
                  setPrice(resData.price)
        
               }catch(error){
                alert("فشلت عملية الجلب")
               }
        
        
            }

            useEffect(()=>{
              getLocations()
            },[])
            useEffect(()=>{
              getLocation()
            },[select])

            
            const deleteLocation=async()=>{
          try{
                const sendData= await axios.delete(`${URL}/api/location/${select}`,{headers: { "Content-Type": "application/json"} })
                   
                   alert(sendData.data.msg)
                   getLocations()
                   setName("")
                   setPrice("")
                   setSelect("")

        
               }catch(error){
                alert("فشلت عملية الحذف")
               }
        
        
            }
  return (
    <div className='addLocation CreateUser d-flex col-12 justify-content-between ' >
        <div className='col-lg-2 said ' ><SaidSuper/></div>
        <div className='col-lg-10 d-flex align-items-center justify-content-center ' >
            <div className='col-lg-3 justify-content-center ' ><UpdateLocationForm
            title={title}
            btnTitle={btnTitle}
            name={name}
            setName={setName}
            price={price}
            setPrice={setPrice}
            select={select}
            setSelect={setSelect}
            locations={locations}
            nameLabel={nameLabel}
            selectLabel={selectLabel}
            apply={deleteLocation}

            /></div>

        </div>
      
    </div>
  )
}

export default DeleteLocation