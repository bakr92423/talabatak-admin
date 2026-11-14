import React from 'react'
import { useEffect, useState } from "react"
import axios from "axios"
import SaidSuper from '../../Components/Layout/SaidSuper'


const Orders = () => {
  const [orders, setOrders] = useState([])
  const [openedOrder, setOpenedOrder] = useState(null)
  const URL = 'https://talabatak-ebon.vercel.app'

  // --- فلتر التاريخ ---
  const getToday = () => {
    const d = new Date()
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const [from, setFrom] = useState(getToday())
  const [to, setTo] = useState(getToday())

  // --- السوبر أدمن: بيجيب كل الأوردرات، من غير pilotId ولا توكن ---
  const getAllOrders = async (fromDate = from, toDate = to) => {
    try {
      // ده الراوت العام اللي بيجيب كل الأوردرات
      const res = await axios.get(`${URL}/api/order`, {
        params: { from: fromDate, to: toDate }
      })
      let data = res.data.data || res.data || []
      

      // فلتر احتياطي في الفرونت لو الباك إند لسه مش بيفلتر
      if (fromDate || toDate) {
        data = data.filter(o => {
          const orderDate = new Date(o.createdAt || o.date || o.created_at)
          if (isNaN(orderDate)) return true
          const dStr = `${orderDate.getFullYear()}-${String(orderDate.getMonth() + 1).padStart(2, '0')}-${String(orderDate.getDate()).padStart(2, '0')}`
          if (fromDate && dStr < fromDate) return false
          if (toDate && dStr > toDate) return false
          return true
        })
      }

      setOrders(data)
    } catch (e) { console.log(e) }
  }

  useEffect(() => {
    getAllOrders()
    // eslint-disable-next-line
  }, [])

  const handleToday = () => {
    const today = getToday()
    setFrom(today)
    setTo(today)
    getAllOrders(today, today)
  }

  return (
    <div className='d-flex previous-page'>
      <div className='col-8 col-md-2 previous-said said mt-3 '><SaidSuper/></div>
      <div className='col-12 col-md-10 previous-content mt-5 ' dir='rtl'>
        <h5 className='previous-title'>كل الطلبات - سوبر أدمن</h5>
        <p className='previous-subtitle'>لديك {orders.length} طلب</p>

        {/* ===== فلتر التاريخ من / إلى ===== */}
        <div className='card p-3 mb-3' style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'end', flexWrap: 'wrap' }}>
          <div>
            <label className='form-label mb-1'>من</label>
            <input type="date" className='form-control' value={from} onChange={(e) => setFrom(e.target.value)} />
          </div>
          <div>
            <label className='form-label mb-1'>إلى</label>
            <input type="date" className='form-control' value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
          <button className='btn previous-btn' onClick={() => getAllOrders()}>عرض</button>
          <button className='btn btn-secondary' onClick={handleToday}>طلبات اليوم</button>
        </div>

        {!openedOrder ? (
          <div className='row g-3'>
            {orders.length === 0 && <p className='col-12 previous-empty'>لا يوجد طلبات</p>}
            {orders.map(o => (
              <div key={o._id} className='col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3'>
                <div className='card previous-card p-3 h-100'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <span className='previous-badge'>{o.status || 'تم الاستلام'}</span>
                    <span className='previous-icon'><i className='fa-solid fa-store ' ></i></span>
                  </div>
                  <h5 className='previous-store'>{o.store?.name || 'مطعم'}</h5>
                  <p className='previous-text'><i className='fa-solid fa-location-pin ' ></i> {o.address}</p>
                  <p className='previous-text'><i className='fa-solid fa-phone ' ></i> {o.phone}</p>
                  <p className='previous-text'>الأصناف: {o.orderItems?.map(i => `${i.product?.name} × ${i.quantity}`).join(' - ')}</p>
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
                <p>الأصناف: {openedOrder.orderItems?.map(i => `${i.product?.name} × ${i.quantity}`).join(' - ')}</p>
                <button className='btn btn-secondary w-100' onClick={() => setOpenedOrder(null)}>إغلاق</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders

