import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import SaidAdmin from '../../../Components/Layout/SaidAdmin'
import OrderCardForm from '../../../Components/Admin/Orders/OrderCardForm'
import axios from 'axios'

const Dashboard = () => {
    const URLSITE = 'https://talabatak-ebon.vercel.app'
    const [orders, setOrders] = useState([])
    const [menuCount, setMenuCount] = useState(0)
    const [openedOrder, setOpenedOrder] = useState(null)

    // ==== صوت الانذار زي الدليفري ====
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
            const today = new Date().toDateString()
            const filtered = all.filter(o => {
                const d = o.createdAt ? new Date(o.createdAt).toDateString() : ""
                const isToday = d === today
                const isAccepted = o.status === "accepted" || o.deliveryStatus === "accepted" || o.status === "acceptedByDelivery"
                return isToday && isAccepted
            })
            const newIds = filtered.map(o => o._id)
            const hasNew = newIds.some(id => !prevIds.current.includes(id))
            if (hasNew && prevIds.current.length > 0) {
                playSound()
                if (navigator.vibrate) navigator.vibrate([200, 100, 200])
                document.title = '🔔 طيار استلم طلب جديد!'
            }
            prevIds.current = newIds
            setOrders(all)
        } catch (e) { console.log(e) }
    }, [])

    const getMenuCount = useCallback(async () => {
        const ownerId = getUserIdFromToken()
        if (!ownerId) return
        try {
            const res = await axios.get(`${URLSITE}/api/product/owner/${ownerId}`, {
                params: { t: Date.now() },
                headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
            })
            const data = res.data.data || res.data || []
            setMenuCount(Array.isArray(data) ? data.length : 0)
        } catch (e) {
            setMenuCount(0)
        }
    }, [])

    useEffect(() => {
        getOrders()
        getMenuCount()
        const interval = setInterval(getOrders, 5000)
        return () => clearInterval(interval)
    }, [getOrders, getMenuCount])

    const { todayRevenue, todayOrdersCount, todayOrders } = useMemo(() => {
        const today = new Date().toDateString()
        const filtered = orders.filter(o => {
            const d = o.createdAt ? new Date(o.createdAt).toDateString() : ""
            const isToday = d === today
            const isAccepted = o.status === "accepted" || o.deliveryStatus === "accepted" || o.status === "acceptedByDelivery"
            return isToday && isAccepted
        })
        const revenue = filtered.reduce((sum, o) => {
            return sum + (Number(o.totalOrder) || Number(o.total) || 0)
        }, 0)
        return {
            todayRevenue: revenue,
            todayOrdersCount: filtered.length,
            todayOrders: filtered,
        }
    }, [orders])

    return (
        <div className='adminHome d-flex justify-content-between ' >
            <div className=' col-10 col-md-4 col-lg-2 said mb-3 ' ><SaidAdmin /></div>
            <div className=' col-12 col-lg-10 mt-3' >
                <div className='cards d-flex justify-content-center my-4 col-12 col-md-8 col-lg-12 mt-5 ' >
                    <div className='card col-5 col-md-3 col-lg-2 d-flex flex-column align-items-center my-1 mx-1  ' >
                        <i className='fa-solid fa-sack-dollar mt-2 ' ></i>
                        <p className='fw-bold my-0 ' >ايرادات اليوم </p>
                        <h4 className='fw-bold my-1 ' > {todayRevenue} ج.م </h4>
                    </div>
                    <div className='card col-5 col-md-3 col-lg-2 d-flex flex-column align-items-center my-1  ' >
                        <i className='fa-solid fa-bag-shopping mt-2 ' ></i>
                        <p className='fw-bold my-0 ' >طلبات اليوم </p>
                        <h4 className='fw-bold my-1 ' > {todayOrdersCount} </h4>
                    </div>
                    <div className='card col-5 col-md-3 col-lg-2 d-flex flex-column align-items-center my-1 mx-1 ' >
                        <i className='fa-solid fa-list mt-2 ' ></i>
                        <p className='fw-bold my-0 ' >اصناف القائمة </p>
                        <h4 className='fw-bold my-1 ' > {menuCount} </h4>
                    </div>
                </div>

                <div className='d-flex justify-content-center my-2 gap-2'>
                    <button className={`btn ${soundOn ? 'btn-success' : 'btn-outline-secondary'}`} onClick={toggleSound}>
                        {soundOn ? '🔔 الصوت شغال' : '🔕 شغل صوت الطلبات الجديدة'}
                    </button>
                    <audio ref={audioRef} src='/new-order.mp3' preload='auto' />
                </div>

                <div className='currentOrders col-12 col-md-9 col-lg-12 align-items-center d-flex flex-column my-4'  >
                    <h4>طلبات اليوم</h4>
                    <div className='d-flex flex-column col-11 col-md-8 col-lg-7 ' >
                        {!openedOrder ? (
                            todayOrders.length === 0 ? (
                                <p className='text-center my-3'>مفيش طلبات النهاردة الدليفري قبلها لسه</p>
                            ) : (
                                todayOrders.map((o) => (
                                    <div className='my-2' key={o._id}><OrderCardForm order={o} onOpen={() => setOpenedOrder(o)} /></div>
                                ))
                            )
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

                                        {/* ===== نفس الجدول اللي ثبتنا عليه ===== */}
                                        <div dir="rtl" style={{ background: '#f2f2f2', borderRadius: '12px', overflow: 'hidden', width: '100%', marginTop: '10px' }}>
                                          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', tableLayout: 'fixed' }}>
                                            <thead>
                                              <tr style={{ background: '#eee', fontWeight: 'bold' }}>
                                                <th style={{ padding: '8px 4px', borderLeft: '1px solid #ddd', width: '50%', wordBreak: 'break-word' }}>المنتج</th>
                                                <th style={{ padding: '8px 4px', borderLeft: '1px solid #ddd', width: '25%' }}>الكمية</th>
                                                <th style={{ padding: '8px 4px', width: '25%' }}>المجموع</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {openedOrder.orderItems?.map((item, index) => {
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

                                        {/* الإجمالي */}
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

export default Dashboard