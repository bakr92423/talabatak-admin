import React from 'react'
import SaidAdmin from '../../../Components/Layout/SaidAdmin'

const ReportPage = () => {
  return (
    <div className=' CreateUser ReportPage d-flex justify-content-between col-12  ' >
     <div className=' col-8 col-md-3 col-lg-2 said  ' ><SaidAdmin/></div>
        <div className=' col-12 col-md-9 col-lg-10 d-flex flex-column align-items-center ' >

            <div className='boxFilter col-11 col-md-11  col-lg-10 py-3 mt-5  d-flex justify-content-center ' >
                <div className='d-flex mx-5 fw-bold my-2 col-md-3 col-lg-2 ' > <label>من</label> <input className='mx-2'  type='date' /></div>
                <div className='d-flex mx-5 fw-bold my-2 col-md-3 col-lg-2 ' > <label>الى</label> <input className='mx-2'  type='date' /></div>

            </div>

            <table className=' d-none d-md-table boxStores col-11 col-md-12   col-lg-10' >
                            <thead className='Store d-flex col-12  ' >
                              <tr className=' d-flex col-12  ' >
                                <td className='text-center fw-bold py-2 col-1 ' >م</td>
                                <td className='text-center fw-bold py-2 col-3 ' >التاريخ</td>
                                <td className='text-center fw-bold py-2 col-3 ' >الصنف</td>
                                <td className='text-center fw-bold py-2 col-2 ' >حالة الصنف</td>
                                <td className='text-center fw-bold py-2 col-1 ' >السعر</td>
                                <td className='text-center fw-bold py-2 col-2 ' >الاحمالى</td>            
                              </tr>
                              
                            </thead>
                            <tbody className='Store d-flex col-12  ' >   
                            <tr className=' d-flex  col-12 ' >
            
                                <td className='text-center fw-bold py-2 col-1 ' >1</td>
                                <td className='text-center fw-bold py-2 col-3 ' >30-10-2026</td>
                                <td className='text-center fw-bold py-2 col-3 ' >حووشى</td>
                                <td className='text-center fw-bold py-2 col-2 ' >مكتمل</td>
                                <td className='text-center fw-bold py-2 col-1 ' >50 ج.م</td>
                                <td className='text-center fw-bold py-2 col-2 ' >50 ج.م</td>
                              </tr>     
                            </tbody>
                          </table>
     
         </div>
                      
     </div>
  )
}

export default ReportPage
