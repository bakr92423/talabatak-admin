import React from 'react'
import SaidSuper from '../../Components/Layout/SaidSuper'

const HomePage = () => {
  return (
    <div className=' d-flex justify-content-between col-12  ' >
      
      <div className='  col-md-3 col-lg-2 said  ' ><SaidSuper/></div>
      <div className=' HomePage col-12 col-md-10 col-lg-10 d-flex align-items-center justify-content-center ' >
        <div className='  d-flex align-items-center justify-content-center col-12 c0l-md-10 col-lg-8 ' ><img src='/Images/2.jpg' /> <div className='boxText fw-bold ' >
          <h3 className=' fw-bold my-2  m-2  text-center'  >مرحبا بك : بكر صابر</h3>
          <h4 className=' fw-bold m-2 text-center '  > شكرا لأنضمامك لفريق طلباتك</h4>
          </div> </div>
      
      </div>
      
    </div>
  )
}

export default HomePage
