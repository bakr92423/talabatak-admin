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
            // params t: Date.now() دي اللي بتلغي مشكلة 304 والكاش
            const getData = await axios.get(`${URLSITE}/api/order/owner/${ownerId}`, {
                params: { t: Date.now() },
                headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
            })
            const all = getData.data.data || getData.data.orders || []

            // فلتر: بتوع النهاردة + الدليفري عمل accepted بس
            const today = new Date().toDateString()
            const filtered = all.filter(o => {
                const d = o.createdAt ? new Date(o.createdAt).toDateString() : ""
                const isToday = d === today
                const isAccepted = o.status === "accepted" || o.deliveryStatus === "accepted" || o.status === "acceptedByDelivery"
                return isToday && isAccepted
            })

            // كشف اوردر جديد زي الدليفري
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

    // هات عدد اصناف القايمة
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

    // ==== الحسابات الديناميك ====
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

                {/* زرار الصوت زي الدليفري */}
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
                                        <p>الأصناف: {openedOrder.orderItems?.map(i => `${i.product?.name} x ${i.quantity}`).join(' - ')}</p>
                                        <div className='d-flex gap-2'>
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