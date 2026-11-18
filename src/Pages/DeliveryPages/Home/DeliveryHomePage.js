import React, { useEffect, useState, useCallback, useRef } from 'react'
import axios from 'axios'
import Said from '../../../Components/Layout/Said'

const DeliveryHomePage = () => {
  const [orders, setOrders] = useState([])
  const [openedOrder, setOpenedOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [soundOn, setSoundOn] = useState(false)
  const prevIds = useRef([])
  const audioRef = useRef(null)
  const soundOnRef = useRef(false)
  const URL = 'https://talabatak-ebon.vercel.app'
    const user=JSON.parse(sessionStorage.getItem("user"))
     const name=user.name

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

  // دالة واحدة لعرض الصنف بالحجم - عشان الكارت والتفاصيل والواتساب
  const formatItems = (items) => {
    return items?.map(i => `${i.name || i.product?.name}${i.size ? ` (${i.size})` : ''} × ${i.quantity} - ${i.price}ج`).join(' | ')
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
    try {
      const res = await axios.get(`${URL}/api/order`)
      
      const list = res.data.data || res.data.orders || res.data || []
      console.log(list,"list");
      const arr = Array.isArray(list) ? list : []
      const pending = arr.filter(o =>
        o.status === 'pending' &&
        (!o.lockedBy || o.lockedBy === pilotId || o.lockedBy?._id === pilotId)
      )
      const newIds = pending.map(o => o._id)
      const hasNew = newIds.some(id => !prevIds.current.includes(id))
      if (hasNew && prevIds.current.length > 0) {
        playSound()
        if (navigator.vibrate) navigator.vibrate([200, 100, 200])
        document.title = '🔔 طلب جديد!'
      }
      prevIds.current = newIds
      setOrders(pending)
    } catch (e) { console.log(e) }
    setLoading(false)
  }, [pilotId, URL])

  useEffect(() => {
    getOrders()
    const interval = setInterval(getOrders, 5000)
    return () => clearInterval(interval)
  }, [getOrders])

  const openOrder = async (order) => {
    try {
      await axios.patch(`${URL}/api/order/${order._id}/lock`, { pilotId })
      setOpenedOrder(order)
      getOrders()
    } catch (e) {
      alert('الأوردر ده مفتوح عند طيار تاني دلوقتي')
      getOrders()
    }
  }

  const closeOrder = async () => {
    if (openedOrder) {
      try { await axios.patch(`${URL}/api/order/${openedOrder._id}/unlock`, { pilotId }) } catch (e) {}
      setOpenedOrder(null)
      getOrders()
    }
  }

  useEffect(() => {
    const handleLeave = () => {
      if (openedOrder) {
        const data = new Blob([JSON.stringify({ pilotId })], { type: 'application/json' })
        navigator.sendBeacon(`${URL}/api/order/${openedOrder._id}/unlock`, data)
      }
    }
    window.addEventListener('beforeunload', handleLeave)
    return () => window.removeEventListener('beforeunload', handleLeave)
  }, [openedOrder, pilotId, URL])

  const acceptOrder = async () => {
    try {
      await axios.patch(`${URL}/api/order/${openedOrder._id}/accept`, { pilotId })
      alert('تم استلام الأوردر، والمطعم وصله التنبيه ✅')
      const phone = (openedOrder.store?.phone || openedOrder.storePhone || '')
        .toString().replace('+', '').replaceAll(' ', '').replaceAll('-', '')
      if (phone) {
        const text = encodeURIComponent(`🔔 تم استلام الطلب\nالمبلغ: ${openedOrder.totalOrder} ج\nالعنوان: ${openedOrder.address}\nالأصناف: ${formatItems(openedOrder.orderItems)}\nانا في الطريق للمطعم دلوقتي 🛵`)

      }
      setOpenedOrder(null)
      getOrders()
    } catch (e) { console.log(e); alert('حصل مشكلة في الاستلام') }
  }
  const cancelledOrder = async () => {
    try {
      await axios.patch(`${URL}/api/order/${openedOrder._id}/status`, { pilotId,status:"cancelled" })
      alert('تم الغاء الأوردر  ✅')

      setOpenedOrder(null)
      getOrders()
    } catch (e) { console.log(e); alert('حصل مشكلة في الغاء الطلب') }
  }

  return (
    <div className='d-flex delivery-page'>
      <div className='col-8 col-md-2 said '><Said /></div>
      <div className='col-12 col-md-10 p-3 p-md-4 mt-5 ' dir='rtl'>

        <div className='d-flex justify-content-between align-items-center flex-wrap gap-2'>
          <div>
            <h2 className='fw-bold mb-1'>طلبات معلقة</h2>
            <p className='text-muted mb-0'>مرحباً، {name}! لديك {orders.length} طلبات جديدة اليوم</p>
          </div>
          <button className={`btn ${soundOn ? 'btn-success' : 'btn-outline-secondary'}`} onClick={toggleSound}>
            {soundOn ? '🔔 الصوت شغال' : '🔕 شغل صوت الطلبات الجديدة'}
          </button>
        </div>
        <audio ref={audioRef} src='/new-order.mp3' preload='auto' />

        <div className='row mt-4'>
          <div className='col-12 col-sm-4 mb-3'><div className='stat-card'><small>الطلبات المعلقة</small><h2>{orders.length} طلبات</h2><small className='text-warning'>منذ أمس +2</small></div></div>
          <div className='col-12 col-sm-4 mb-3'><div className='stat-card'><small>أرباح اليوم</small><h2>450 جنيه</h2><small className='text-success'>↑ 12% عن الأمس</small></div></div>
          <div className='col-12 col-sm-4 mb-3'><div className='stat-card'><small>التقييم</small><h2>4.8 / 5 ⭐</h2><small>25 تقييم هذا الأسبوع</small></div></div>
        </div>

        <h4 className='fw-bold mt-2 mb-3'>الطلبات المتاحة الآن</h4>

        {!openedOrder ? (
          <div className='row'>
            {orders.length === 0 && <p className='col-12'>مفيش طلبات معلقة دلوقتي</p>}
            {orders.map(o => (
              <div key={o._id} className='col-12 col-sm-6 col-lg-4 col-xl-3 mb-3'>
                <div className='card delivery-card p-3 h-100'>
                  <div className='d-flex justify-content-between'><span className='badge-new'>جديد</span><span><i className='fa-solid fa-store ' ></i></span></div>
                  <h5>{o.store?.name || 'مطعم'}</h5>
                  <p><i className='fa-solid fa-location-pin ' ></i> {o.address}</p>
                  <p><i className='fa-solid fa-phone ' ></i> {o.phone}</p>
                  <p className='small text-muted'>الأصناف: {formatItems(o.orderItems)}</p>
                  <p className='fw-bold text-success'>إجمالي المبلغ: {o.totalOrder} جنيه</p>
                  <button className='btn btn-open w-100 mt-auto' onClick={() => openOrder(o)}>فتح الطلب</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='row justify-content-center mt-3'>
            <div className='col-12 col-md-8 col-lg-6'>
              <div className='card delivery-card p-4'>
                <div className='d-flex  justify-content-between ' >
                  <h4>تفاصيل الطلب - {openedOrder.totalOrder} ج</h4>
                    <a href={`tel:${openedOrder.phone}`} className=' phone d-flex justify-content-center align-items-center ' ><i className='fa-solid fa-phone text-light fw-bold '></i></a>

                  </div>
                <p>العنوان: {openedOrder.address}</p>
                <p>التليفون: {openedOrder.phone}</p>
                <p>المطعم: {openedOrder.store?.name || 'مطعم'}</p>
                <p>الأصناف: {formatItems(openedOrder.orderItems)}</p>
                <div className='d-flex gap-2'>
                  <button className='btn btn-success flex-fill' onClick={acceptOrder}>استلام الطلب ✅</button>
                  <button className='btn btn-dinger flex-fill' onClick={cancelledOrder}>الغاء الطلب ✅</button>
                  <button className='btn btn-secondary flex-fill' onClick={closeOrder}>خروج من الطلب</button>
                </div>
                <small className='text-muted d-block mt-2'>الطلب ده مقفول عليك، مش هيظهر عند أي طيار تاني</small>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default DeliveryHomePage



