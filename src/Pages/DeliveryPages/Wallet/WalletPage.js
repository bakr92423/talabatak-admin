
import React, { useState, useEffect, useCallback } from 'react'
import Said from '../../../Components/Layout/Said'

import axios from 'axios'


const WalletPage = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
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

  // هات كل الاوردرات من نفس API الطلبات الحالية
  const getOrders = useCallback(async () => {
    try {
      const res = await axios.get(`${URL}/api/order`)
      const list = res.data.data || res.data.orders || res.data || []
 
      
      setOrders(Array.isArray(list) ? list : [])
    } catch (e) { console.log(e) }
    setLoading(false)
  }, [URL])

  useEffect(() => {
    getOrders()
    const interval = setInterval(getOrders, 5000)
    return () => clearInterval(interval)
  }, [getOrders])


  const getOrderPilot = (o) => {
    return o.pilotId || o.pilot || o.acceptedBy || o.driverId || o.deliveryId || o.lockedBy || null
  }

  const isMyOrder = (o) => {
    const p = getOrderPilot(o)
    if (!p) return false
    if (typeof p === 'string') return p === pilotId
    if (typeof p === 'object') return p._id === pilotId || p.id === pilotId
    return false
  }

  // مكسب الطيار من الاوردر - لو الباك اند عندك فيه deliveryFee هياخده، لو مفيش هيحسب 40 ج ثابت
  const getEarning = (o) => {
    return Number(o.pilotEarning || o.deliveryFee || o.deliveryPrice || o.pilotFee || o.commission || 40)
  }

  const isToday = (dateStr) => {
    if (!dateStr) return false
    const d = new Date(dateStr)
    const now = new Date()
    return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }

  const myOrders = orders.filter(isMyOrder)

  // اللي اتسلم فعلا
  const deliveredOrders = myOrders.filter(o =>
    ["accepted",'delivered', 'completed', 'done', 'Delivered', 'finished'].includes(o.status)
  )

  const todayDelivered = deliveredOrders.filter(o => isToday(o.createdAt || o.date || o.updatedAt))

  const cancelledOrders = myOrders.filter(o =>
    ['cancelled', 'canceled', 'rejected'].includes(o.status)
  )
  const todayCancelled = cancelledOrders.filter(o => isToday(o.createdAt || o.updatedAt))

  // الارقام
  const todayEarnings = todayDelivered.reduce((sum, o) => sum + getEarning(o), 0)
  const totalBalance = deliveredOrders.reduce((sum, o) => sum + getEarning(o), 0)
  const deliveredCount = todayDelivered.length
  const cancelledCount = todayCancelled.length
  const avgPerTrip = deliveredCount > 0 ? Math.round(todayEarnings / deliveredCount) : 0

  // الهدف اليومي
  const goal = 500
  const goalPercent = Math.min(100, Math.round((todayEarnings / goal) * 100))
  const remaining = Math.max(0, goal - todayEarnings)

  // معاملات المحفظة - من الاوردرات المتسلمة
  const transactions = [
    ...todayDelivered.map(o => ({
      id: o._id,
      title: `إيراد رحلة - ${o.store?.name || 'مطعم'}`,
      desc: `${new Date(o.createdAt || o.updatedAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })} • ${o.address || ''}`,
      amount: getEarning(o),
      type: 'earning'
    })),
    // لو عمل 8 توصيلات بنحط مكافأة تجريبية زي ما كنت عامل
    ...(deliveredCount >= 5 ? [{ id: 'bonus', title: 'مكافأة يومية', desc: 'اليوم، 08:00 ص', amount: 50, type: 'bonus' }] : [])
  ]

  if (loading) return <div className='text-center p-5' dir='rtl'>جاري تحميل المحفظة...</div>

  return (
    <div className='d-flex delivery-page'>
      <div className='d-none d-md-block col-md-2 said'><Said /></div>
      <div className='col-12 col-md-10 p-3 p-md-4 wallet-page' dir='rtl'>

        <div className='d-flex justify-content-between align-items-center mb-3'>
          <h4 className='wallet-title'>المحفظة والعمل</h4>
          <span className='wallet-bell'>🔔</span>
        </div>

        {/* البنر الأسود - الرصيد = مجموع كل ارباحك من الاوردرات المتسلمة */}
        <div className='balance-banner'>
          <div className='d-flex justify-content-between align-items-center'>
            <div>
              <p className='balance-label'>الرصيد الحالي</p>
              <h1 className='balance-value'>{totalBalance.toLocaleString()} <span>ج.م</span></h1>
              <small className='balance-update'>من {deliveredOrders.length} توصيلة إجمالي • محدث تلقائي كل 5 ثواني</small>
            </div>
            <div className='balance-icon'>💰</div>
          </div>
        </div>

        {/* تفاصيل عمل اليوم - محسوبة من /api/order */}
        <h5 className='section-title'>📅 تفاصيل عمل اليوم</h5>
        <div className='row g-2 g-md-3'>
          <div className='col-6'>
            <div className='stat-card'>
              <div className='stat-icon'>💰</div>
              <h3>{todayEarnings} ج.م</h3>
              <p>أرباح اليوم</p>
            </div>
          </div>
          <div className='col-6'>
            <div className='stat-card'>
              <div className='stat-icon'>🛵</div>
              <h3>{deliveredCount}</h3>
              <p>رحلات تم تسليمها</p>
            </div>
          </div>
          <div className='col-6'>
            <div className='stat-card'>
              <div className='stat-icon'>📊</div>
              <h3>{avgPerTrip} ج.م</h3>
              <p>متوسط لكل رحلة</p>
            </div>
          </div>
          <div className='col-6'>
            <div className='stat-card'>
              <div className='stat-icon'>❌</div>
              <h3>{cancelledCount}</h3>
              <p>طلب مُلغى</p>
            </div>
          </div>
        </div>

        {/* هدف اليوم */}
        <div className='goal-box mt-3 mt-md-4'>
          <div className='d-flex justify-content-between flex-wrap'>
            <b>هدف اليوم</b>
            <span>{goalPercent}% من {goal} ج.م</span>
          </div>
          <div className='progress wallet-progress mt-2'>
            <div className='progress-bar' style={{ width: `${goalPercent}%` }}></div>
          </div>
          <small>{todayEarnings} ج.م من {goal} ج.م • متبقٍ {remaining} ج.م</small>
        </div>

        {/* رحلات اليوم - من الـ API الحقيقي */}
        <div className='d-flex justify-content-between align-items-center mt-4'>
          <h5 className='section-title mb-0'>رحلات اليوم</h5>
          <small>{todayDelivered.length} رحلة</small>
        </div>

        {todayDelivered.length === 0 && <p className='text-muted mt-2'>لسه مسلمتش اي اوردر النهاردة</p>}

        <div className='trips-timeline mt-3'>
          {todayDelivered.map((o) => (
            <div key={o._id} className='trip-item'>
              <div className='trip-dot'></div>
              <div className='flex-grow-1'>
                <b>{o.store?.name || 'مطعم'}</b>
                <p>تم التسليم • {o.address || ''}</p>
              </div>
              <div className='text-start'>
                <div className='trip-time'>{new Date(o.createdAt || o.updatedAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}</div>
                <b className='trip-price'>{getEarning(o)} ج.م</b>
              </div>
            </div>
          ))}
        </div>

        {/* معاملات المحفظة */}
        <div className='d-flex justify-content-between align-items-center mt-4'>
          <h5 className='section-title mb-0'>معاملات المحفظة</h5>
          <span className='show-all'>عرض الكل</span>
        </div>
        <div className='mt-3'>
          {transactions.length === 0 && <p className='text-muted'>مفيش معاملات لسه</p>}
          {transactions.map(t => (
            <div key={t.id} className='tx-card'>
              <div className={`tx-icon ${t.type === 'bonus' ? 'bonus' : 'earning'}`}>
                {t.type === 'bonus' ? '🎁' : '💰'}
              </div>
              <div className='flex-grow-1'>
                <b>{t.title}</b>
                <p>{t.desc}</p>
              </div>
              <b className='tx-amount'>+{t.amount} ج.م</b>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default WalletPage
