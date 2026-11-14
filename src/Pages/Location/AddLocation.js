import React, { useState } from 'react'
import SaidSuper from '../../Components/Layout/SaidSuper'
import LocationForm from '../../Components/Location/LocationForm'
import axios from 'axios'

const AddLocation = () => {
    const title="اضافة موقع"
    const btnTitle="اضافة "
    const [name,setName]=useState()
    const [price,setPrice]=useState()
    const URL='https://talabatak-ebon.vercel.app'

     const addLocation=async()=>{
        
               try{

                  const data={
                    name,
                    price
                  }
                const sendData= await axios.post(`${URL}/api/location`,data,{headers: { "Content-Type": "application/json"} })
        
                    if(sendData.data.errors){
                    return alert(sendData.data.errors[0].msg)
                   }
                   console.log(sendData.data.data);
                   
                   alert(sendData.data.msg)
                    setName("")
                   setPrice("")
        
               }catch(error){
                alert("فشلت عملية الاضافة")
               }
        
        
            }
  return (
    <div className='addLocation CreateUser d-flex col-12 justify-content-between ' >
        <div className='col-lg-2 said ' ><SaidSuper/></div>
        <div className='col-lg-10 d-flex align-items-center justify-content-center ' >
            <div className='col-lg-3 justify-content-center ' ><LocationForm
            title={title}
            btnTitle={btnTitle}
            name={name}
            setName={setName}
            price={price}
            setPrice={setPrice}
            apply={addLocation}

            /></div>

        </div>
      
    </div>
  )
}

export default AddLocation