import React from 'react'
import { Link } from 'react-router-dom'

const OrderCardForm = ({ order, onOpen }) => {
  if (!order) return null

  const minutesAgo = order.createdAt ? Math.floor((Date.now() - new Date(order.createdAt)) / 60000) : 0

  return (
    <div>
      <div className='boxOrder col-12 p-2' style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        
        {/* فوق: بيانات العميل + الأزرار */}
        <div className='d-flex justify-content-between align-items-start' style={{ gap: '10px' }}>
          <div>
            <h5 className='fw-bold mb-1'>{order.customerName || order.name || 'عميل'} <i className='fa-solid fa-user'></i></h5>
            <p className='mb-1'>من {minutesAgo} دقيقه <i className='fa-solid fa-clock'></i></p>
            <p className='fw-bold mb-1'>عدد الاصناف : {order.orderItems?.length || 0}</p>
            <p className='fw-bold mb-0'>{order.totalOrder} ج</p>
          </div>

          <div className='d-flex flex-column gap-2' style={{ minWidth: '110px' }}>
            <Link className='btn fw-bold'>{order.status || 'جاري التحضير'}</Link>
            <button onClick={onOpen} className='btn fw-bold'>عرض التفاصيل</button>
          </div>
        </div>

        {/* تحت: الجدول بعرض الكارت كله */}
        <div dir="rtl" style={{ background: '#f2f2f2', borderRadius: '12px', overflow: 'hidden', width: '100%' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', tableLayout: 'fixed' }}>
            <thead>
              <tr style={{ background: '#eee', fontWeight: 'bold' }}>
                <th style={{ padding: '8px 4px', borderLeft: '1px solid #ddd', width: '50%', wordBreak: 'break-word' }}>المنتج</th>
                <th style={{ padding: '8px 4px', borderLeft: '1px solid #ddd', width: '25%' }}>الكمية</th>
                <th style={{ padding: '8px 4px', width: '25%' }}>المجموع</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems?.map((item, index) => {
                const name = item.name || item.product?.name
                const size = item.size ? ` (${item.size})` : ''
                const total = item.price * item.quantity
                return (
                  <tr key={index} style={{ borderTop: '1px solid #ddd' }}>
                    <td style={{ padding: '8px 4px', fontWeight: 'bold', wordBreak: 'break-word' }}>{name}{size}</td>
                    <td style={{ padding: '8px 4px' }}>
                      <span dir="ltr" style={{ background: '#d9d9d9', padding: '3px 12px', borderRadius: '20px', display: 'inline-block', fontWeight: 'bold' }}>
                        x {item.quantity}
                      </span>
                    </td>
                    <td dir="ltr" style={{ padding: '8px 4px', fontWeight: 'bold', whiteSpace: 'nowrap' }}>{total} ج</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default OrderCardForm
