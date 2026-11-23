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

        {/* ===== اتظبط: جدول المنتج | الكمية | المجموع ===== */}
        <div className='orderItems d-flex justify-content-center align-items-center col-5'>
          <div dir="rtl" style={{ background: '#f2f2f2', borderRadius: '12px', overflow: 'hidden', width: '100%' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#eee', fontWeight: 'bold' }}>
                  <th style={{ padding: '6px', borderLeft: '1px solid #ddd' }}>المنتج</th>
                  <th style={{ padding: '6px', borderLeft: '1px solid #ddd' }}>الكمية</th>
                  <th style={{ padding: '6px' }}>المجموع</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItems?.map((item, index) => {
                  const name = item.name || item.product?.name
                  const size = item.size ? ` (${item.size})` : ''
                  const total = item.price * item.quantity
                  return (
                    <tr key={index} style={{ borderTop: '1px solid #ddd' }}>
                      <td style={{ padding: '6px', fontWeight: 'bold' }}>{name}{size}</td>
                      <td style={{ padding: '6px' }}>
                        <span dir="ltr" style={{ background: '#d9d9d9', padding: '2px 10px', borderRadius: '20px', display: 'inline-block', fontWeight: 'bold' }}>
                          x {item.quantity}
                        </span>
                      </td>
                      <td dir="ltr" style={{ padding: '6px', fontWeight: 'bold' }}>{total} ج</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
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
