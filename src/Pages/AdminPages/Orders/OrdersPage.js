import React, { useEffect, useState, useCallback, useRef } from 'react'
import SaidAdmin from '../../../Components/Layout/SaidAdmin'
import OrderCardForm from '../../../Components/Admin/Orders/OrderCardForm'
import axios from 'axios'

const OrdersPage = () => {
  const URLSITE = 'https://talabatak-ebon.vercel.app'

  const [orders, setOrders] = useState([])
  const [openedOrder, setOpenedOrder] = useState(null)
  const [filter, setFilter] = useState('all') // all | مكتمل | معلق | ملغاء

  // ==== صوت الانذار زي الداشبورد بالظبط ====
  const [soundOn, setSoundOn] = useState(false)
  const prevIds = useRef([])
  const audioRef = useRef(null)
  const soundOnRef = useRef(false)

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('token')
    if (!token) return null
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.id || payload._id || payload.userId || payload.user_id
    } catch (e) {
      return null
    }
  }

  const playSound = () => {
    if (!soundOnRef.current) return
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      for (let i = 0; i < 3; i++) {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain); gain.connect(ctx.destination)
        osc.frequency.value = 880
        gain.gain.value = 0.2
        osc.start(ctx.currentTime + i * 0.5)
        osc.stop(ctx.currentTime + i * 0.5 + 0.4)
      }
    } catch (e) {}
  }

  const toggleSound = () => {
    const next = !soundOn
    setSoundOn(next)
    soundOnRef.current = next
    if (next) setTimeout(() => playSound(), 100)
  }

  const getOrders = useCallback(async () => {
    const ownerId = getUserIdFromToken()
    if (!ownerId) return
    try {
      const getData = await axios.get(`${URLSITE}/api/order/owner/${ownerId}`, {
        params: { t: Date.now() },
        headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
      })
      const all = getData.data.data || getData.data.orders || []

      // ==== نفس فلتر الداشبورد بالظبط ====
      // النهاردة بس + الدليفري عملها استلام
      const today = new Date().toDateString()
      const todayAccepted = all.filter(o => {
        const d = o.createdAt ? new Date(o.createdAt).toDateString() : ""
        const isToday = d === today
        const isAccepted = o.status === "accepted" || o.deliveryStatus === "accepted" || o.status === "acceptedByDelivery"
        return isToday && isAccepted
      })

      // كشف اوردر جديد على اللي اتقبل من الدليفري بس
      const newIds = todayAccepted.map(o => o._id)
      const hasNew = newIds.some(id => !prevIds.current.includes(id))
      if (hasNew && prevIds.current.length > 0) {
        playSound()
        if (navigator.vibrate) navigator.vibrate([200, 100, 200])
        document.title = '🔔 طيار استلم طلب جديد!'
      }
      prevIds.current = newIds

      // بنخزن اللي اتقبل النهاردة بس، مش كل الاوردرات
      setOrders(todayAccepted)
    } catch (e) { console.log(e) }
  }, [])

  useEffect(() => {
    getOrders()
    const interval = setInterval(getOrders, 5000)
    return () => clearInterval(interval)
  }, [getOrders])

  // فلترة على حسب الزرار - بتشتغل على طلبات النهاردة المقبولة بس
  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  return (
    <div className='CreateUser CurrentItems OrdersPage d-flex justify-content-between col-12'>
      <div className='col-8 col-md-4 col-lg-2 said'><SaidAdmin /></div>
      <div className='col-12 col-md-8 col-lg-10 d-flex flex-column align-items-center'>
        <div className='btns d-flex justify-content-center col-8 mt-5 mb-2'>
          <button onClick={() => setFilter('all')} className='btn col-5 col-md-3 my-2 mx-1 py-2 px-5 justify-content-center d-flex '>الكل</button>
          <button onClick={() => setFilter('مكتمل')} className='btn col-5 col-md-3 my-2 mx-1 py-2 px-5 justify-content-center d-flex '>مكتمل</button>
          <button onClick={() => setFilter('معلق')} className='btn col-5 col-md-3 my-2 mx-1 py-2 px-5 justify-content-center d-flex '>معلق</button>
          <button onClick={() => setFilter('ملغاء')} className='btn col-5 col-md-3 my-2 mx-1 py-2 px-5 justify-content-center d-flex '>ملغاء</button>
        </div>

        <div className='d-flex justify-content-center my-2 gap-2'>
          <button className={`btn ${soundOn ? 'btn-success' : 'btn-outline-secondary'}`} onClick={toggleSound}>
            {soundOn ? '🔔 الصوت شغال' : '🔕 شغل صوت الطلبات الجديدة'}
          </button>
          <audio ref={audioRef} src='/new-order.mp3' preload='auto' />
        </div>

        <div className='currentOrders align-items-center d-flex flex-column my-4 col-11 col-lg-8'>
          <h4>طلبات اليوم المقبولة من الدليفري : {filteredOrders.length}</h4>
          <div className='d-flex flex-column col-12'>
            {!openedOrder ? (
              filteredOrders.length === 0 ? <p className='text-center mt-4'>مفيش طلبات النهاردة الدليفري قبلها لسه</p> :
              filteredOrders.map((o) => (
                <div className='my-2' key={o._id}>
                  <OrderCardForm order={o} onOpen={() => setOpenedOrder(o)} />
                </div>
              ))
            ) : (
              <div className='row justify-content-center mt-3'>
                <div className='col-12 col-md-8 col-lg-6'>
                  <div className='card delivery-card p-4'>
                    <div className='d-flex justify-content-between'>
                      <h4>تفاصيل الطلب - {openedOrder.totalOrder} ج</h4>
                    </div>
                    <p>العنوان: {openedOrder.address}</p>
                    <p>التليفون: {openedOrder.phone}</p>
                    <p>المطعم: {openedOrder.store?.name || 'مطعم'}</p>

                    {/* ===== جدول الأصناف بنفس شكل الصورة بالظبط ===== */}
                    <div className="mt-3" dir="rtl" style={{ background: '#f2f2f2', borderRadius: '16px', overflow: 'hidden' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                        <thead>
                          <tr style={{ background: '#eee', fontWeight: 'bold' }}>
                            <th style={{ padding: '12px', borderLeft: '1px solid #ddd' }}>المنتج</th>
                            <th style={{ padding: '12px', borderLeft: '1px solid #ddd' }}>الكمية</th>
                            <th style={{ padding: '12px' }}>المجموع</th>
                          </tr>
                        </thead>
                        <tbody>
                          {openedOrder.orderItems?.map((i, idx) => {
                            const name = i.name || i.product?.name
                            const size = i.size ? ` (${i.size})` : ''
                            const total = i.price * i.quantity
                            return (
                              <tr key={idx} style={{ borderTop: '1px solid #ddd' }}>
                                <td style={{ padding: '12px', fontWeight: 'bold' }}>{name}{size}</td>
                                <td style={{ padding: '12px' }}>
                                  <span dir="ltr" style={{ background: '#d9d9d9', padding: '4px 14px', borderRadius: '20px', display: 'inline-block', fontWeight: 'bold' }}>
                                    x {i.quantity}
                                  </span>
                                </td>
                                <td dir="ltr" style={{ padding: '12px', fontWeight: 'bold' }}>{total} ج</td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* المجموع الفرعي / الإجمالي */}
                    <div className="mt-3" dir="rtl">
                      <div className="d-flex justify-content-between py-1">
                        <span>المجموع الفرعي</span>
                        <span dir="ltr">{openedOrder.totalOrder} ج</span>
                      </div>
                      <div className="d-flex justify-content-between py-1 border-top">
                        <span style={{ fontWeight: 'bold', fontSize: '18px' }}>الإجمالي</span>
                        <span dir="ltr" style={{ fontWeight: 'bold', fontSize: '18px', color: '#ff6a00' }}>{openedOrder.totalOrder} ج</span>
                      </div>
                    </div>

                    <div className='d-flex gap-2 mt-3'>
                      <button onClick={() => setOpenedOrder(null)} className='btn btn-secondary flex-fill'>خروج من الطلب</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrdersPage

