import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SaidSuper from '../../Components/Layout/SaidSuper'


const HomeAds = () => {
  const site="https://talabatak-ebon.vercel.app"
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [ads, setAds] = useState([])

  // 1- نجيب الاعلانات من الداتابيز مش من localStorage
  const getData = async () => {
    const res = await axios.get(`${site}/api/ads`)
    setAds(res.data)
  }

  useEffect(() => {
    getData()
  }, [])

  const handleFileChange = (e) => {
    setImage(e.target.files[0])
  }

  const addAd = async () => {
    if (!image) return alert('اختار صورة الاول')
    try {
      setLoading(true)

      // الخطوة الاولى: رفع الصورة براوت رفع الصور بتاعك
      const formData = new FormData()
      formData.append("image", image)
      const sendImage = await axios.post(`${site}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })
      const imageUrl = sendImage.data.imageUrl

      // الخطوة التانية: حفظ اللينك في جدول الاعلانات
      await axios.post(`${site}/api/ads`, { image: imageUrl })

      setImage(null)
      getData() // نحدث الليست
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    await axios.delete(`${site}/api/ads/${id}`)
    getData()
  }

  return (
    <div className='d-flex ads '>
      <div className='col-3 col-md-2 said'><SaidSuper /></div>
      <div className='col-9 col-md-10 p-3 p-md-4' dir='rtl'>
        <h3 className='ads-title'>إعلانات البانر</h3>
        <p className='ads-sub'>ارفع صور البانر، هتظهر في السلايدر في الابلكيشن</p>

        <div className='ads-upload-box justify-content-center col-9 col-md-5 '>
          <label className='ads-upload-btn'>
            <i className="fa-solid fa-cloud-arrow-up"></i>
            {image ? image.name : 'اختار صورة البانر'}
            <input type='file' accept='image/*' onChange={handleFileChange} hidden />
          </label>
          <button className='ads-add-btn' onClick={addAd} disabled={loading}>
            {loading ? 'جاري الرفع...' : 'رفع الاعلان'}
          </button>
        </div>

        <div className='ads-grid'>
          {ads.map((ad, index) => (
            <div className='ads-card' key={ad._id}>
              <img src={ad.image} alt='banner' />
              <div className='ads-card-footer'>
                <span>بانر {index + 1}</span>
                <button onClick={() => handleDelete(ad._id)}>
                  <i className="fa-solid fa-trash"></i> حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeAds
