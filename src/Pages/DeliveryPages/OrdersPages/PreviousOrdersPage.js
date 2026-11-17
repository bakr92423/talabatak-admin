import React from 'react'

import { useEffect, useState } from "react"
import axios from "axios"
import Said from '../../../Components/Layout/Said'

const PreviousOrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [openedOrder, setOpenedOrder] = useState(null)
  const URL = 'https://talabatak-ebon.vercel.app'

  const getPilotId = () => {
    try {
      const token = localStorage.getItem('token')
      if (!token || token.split('.').length !== 3) return null
      let payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
      while (payload.length % 4) payload += '='
      const decoded = JSON.parse(atob(payload))
      return decoded.id || decoded._id || decoded.userId || decoded.user_id
    } catch { return null }
  }
  const pilotId = getPilotId()
  console.log(pilotId,"pilod");

  // دالة واحدة لعرض الصنف بالحجم
  const formatItems = (items) => {
    return items?.map(i => `${i.name || i.product?.name}${i.size ? ` (${i.size})` : ''} × ${i.quantity} - ${i.price}ج`).join(' | ')
  }

  useEffect(() => {
    const getPrevious = async () => {
      if (!pilotId) return
      try {
        const res = await axios.get(`${URL}/api/order/delivery/previous/${pilotId}`)
        console.log(pilotId,"pil");
        console.log(res,"res");
        
        setOrders(res.data.data || [])
      } catch (e) { console.log(e) }
    }
    getPrevious()
  }, [pilotId])

  return (
    <div className='d-flex previous-page'>
      <div className='col-8 col-md-2 previous-said said '><Said /></div>
      <div className='col-12 col-md-10 previous-content mt-5' dir='rtl'>
        <h5 className='previous-title'>الطلبات السابقة</h5>
        <p className='previous-subtitle'>لديك {orders.length} طلبات سابقة</p>

        {!openedOrder ? (
          <div className='row g-3'>
            {orders.length === 0 && <p className='col-12 previous-empty'>لا يوجد طلبات سابقة</p>}
            {orders.map(o => (
              <div key={o._id} className='col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3'>
                <div className='card previous-card p-3 h-100'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <span className='previous-badge'>تم الاستلام</span>
                    <span className='previous-icon'><i className='fa-solid fa-store ' ></i></span>
                  </div>
                  <h5 className='previous-store'>{o.store?.name || 'مطعم'}</h5>
                  <p className='previous-text'><i className='fa-solid fa-location-pin ' ></i> {o.address}</p>
                  <p className='previous-text'><i className='fa-solid fa-phone ' ></i> {o.phone}</p>
                  <p className='previous-text'>الأصناف: {formatItems(o.orderItems)}</p>
                  <p className='previous-price'>إجمالي المبلغ: {o.totalOrder} جنيه</p>
                  <button className='btn previous-btn w-100 mt-auto' onClick={() => setOpenedOrder(o)}>فتح الطلب</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='row justify-content-center mt-3'>
            <div className='col-12 col-sm-10 col-md-8 col-lg-6'>
              <div className='card previous-card previous-details p-4'>
                <h4>تفاصيل الطلب - {openedOrder.totalOrder} ج</h4>
                <p>العنوان: {openedOrder.address}</p>
                <p>التليفون: {openedOrder.phone}</p>
                <p>المطعم: {openedOrder.store?.name || 'مطعم'}</p>
                <p>الأصناف: {formatItems(openedOrder.orderItems)}</p>
                <button className='btn btn-secondary w-100' onClick={() => setOpenedOrder(null)}>إغلاق</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PreviousOrdersPage
