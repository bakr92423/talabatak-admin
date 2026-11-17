import React from 'react'
import { Link } from 'react-router-dom'

const OrderCardForm = ({ order, onOpen }) => {
  if (!order) return null

  // حساب من كام دقيقة
  const minutesAgo = order.createdAt ? Math.floor((Date.now() - new Date(order.createdAt)) / 60000) : 0

  return (
    <div>
      <div className='boxOrder d-flex justify-content-between col-12'>
        <div className='mx-2 py-2 col-3'>
          <h5 className='fw-bold'>{order.customerName || order.name || 'عميل'} <i className='fa-solid fa-user'></i></h5>
          <p>من {minutesAgo} دقيقه <i className='fa-solid fa-clock'></i></p>
          <p className='fw-bold'>عدد الاصناف : {order.orderItems?.length || 0}</p>
          <p className='fw-bold'>{order.totalOrder} ج</p>
        </div>

        <div className='orderItems d-flex justify-content-center align-items-center col-5 flex-wrap'>
          {order.orderItems?.map((item, index) => (
            <p className='mx-1' key={index}>
              {item.name || item.product?.name}
              {item.size ? ` (${item.size})` : ''}
              {' '}{item.quantity}x - {item.price}ج
            </p>
          ))}
        </div>

        <div className='d-flex flex-column justify-content-around mx-2 py-1 col-3 col-lg-2'>
          <Link className='btn fw-bold'>{order.status || 'جاري التحضير'}</Link>
          <button onClick={onOpen} className='btn fw-bold'>عرض التفاصيل</button>
        </div>
      </div>
    </div>
  )
}

export default OrderCardForm
