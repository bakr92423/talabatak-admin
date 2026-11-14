import React from 'react'
import { Link } from 'react-router-dom'

const SaidSuper = () => {
  

  return (
      <div className=" boxNav   ">
  {/* زر القائمة يظهر فقط على الشاشات الصغيرة */}
  <button
    className="btn btn-primary BtnMenu d-block d-md-none mb-5  "
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#sidebarMenu"
    aria-expanded="false"
    aria-controls="sidebarMenu"
  >
    لوحة التحكم
  </button>

  {/* القائمة الجانبية */}
  <div className="collapse d-md-block  " id="sidebarMenu">
    <nav className=" p-3 rounded   ">
      <div className="d-flex justify-content-center  "  ><i className='fa-solid fa-house px-1 ' ></i><h5 className=" mb-4 fw-bold  ">  القائمة</h5></div>

   

      {/*  المتاجر */}
      <div className="mb-2 d-flex justify-content-end flex-column fw-bold ">
         <button
          className=" nav-link mainTitle d-block px-3 py-2 text-dark text-end "
          type='button'
          data-bs-toggle="collapse"
          data-bs-target="#storeMenu"
          aria-expanded="true"
          aria-controls="storeMenu"
        >
          <i className='fa-solid fa-store px-1 ' ></i>
          المتاجر 
          <i className='fa-solid fa-caret-down px-1 ' ></i>
        </button>
        <div className="collapse " id="storeMenu">
          <Link to="/superAdmin/addStore" className="d-block px-3 py-1 text-dark "><i className='fa-solid fa-file-circle-plus px-1 ' ></i>اضافة متجر</Link>
          <Link to="/superAdmin/currentStore" className="d-block px-3 py-1 text-dark "><i className='fa-solid fa-list-ul px-1 ' ></i> المتاجر الحالية </Link>
          <Link to="/superAdmin/updateStore" className="d-block px-3 py-1 text-dark "><i className='fa-solid fa-pen-to-square px-1 ' ></i> تحديث المتجر </Link>
          <Link to="/superAdmin/typeStore" className="d-block px-3 py-1 text-dark "> <i className='fa-solid fa-layer-group px-1 ' ></i>اضافة نوع المتجر</Link>

        </div>
      </div>

       {/*  الموقع */}
      <div className="mb-2 d-flex justify-content-end flex-column fw-bold ">
         <button
          className=" nav-link mainTitle d-block px-3 py-2 text-dark text-end "
          type='button'
          data-bs-toggle="collapse"
          data-bs-target="#locationMenu"
          aria-controls="locationMenu"
        >
          <i className='fa-solid fa-map-location-dot px-1 ' ></i>
          الموقع 
          <i className='fa-solid fa-caret-down px-1 ' ></i>
        </button>
        <div className="collapse " id="locationMenu">
          <Link to="/superAdmin/addLocation" className="d-block px-3 py-1 text-dark "><i className='fa-solid fa-location-dot px-1 ' ></i> اضافة موقع</Link>
          <Link to="/superAdmin/updateLocation" className="d-block px-3 py-1 text-dark "> <i className='fa-solid fa-pen-to-square px-1 ' ></i>تحديث موقع</Link>
          <Link to="/superAdmin/deleteLocation" className="d-block px-3 py-1 text-dark "><i className='fa-solid fa-trash-can px-1 ' ></i> حذف موقع </Link>
        </div>
      </div>
       {/*  الاعلانات */}
      <div className="mb-2 d-flex justify-content-end flex-column fw-bold ">
         <button
          className=" nav-link mainTitle d-block px-3 py-2 text-dark text-end "
          type='button'
          data-bs-toggle="collapse"
          data-bs-target="#adsMenu"
          aria-controls="adsMenu"
        >
          <i className='fa-solid fa-bullhorn px-1 ' ></i>
          الاعلانات 
          <i className='fa-solid fa-caret-down px-1 ' ></i>
        </button>
        <div className="collapse " id="adsMenu">
          <Link to="/superAdmin/addAds" className="d-block px-3 py-1 text-dark "><i className='fa-solid fa-square-plus px-1 ' ></i> اضافة اعلان</Link>
          <Link to="/superAdmin/deleteAds" className="d-block px-3 py-1 text-dark "><i className='fa-solid fa-chart-line px-1 ' ></i> حذف موقع </Link>
        </div>
      </div>
       {/*  الطلبات */}
      <div className="mb-2 d-flex justify-content-end flex-column fw-bold ">
         <button
          className=" nav-link mainTitle d-block px-3 py-2 text-dark text-end "
          type='button'
          data-bs-toggle="collapse"
          data-bs-target="#ordersMenu"
          aria-controls="ordersMenu"
        >
          <i className='fa-solid fa-cart-shopping px-1 ' ></i>
          الطلبات 
          <i className='fa-solid fa-caret-down px-1 ' ></i>
        </button>
        <div className="collapse " id="ordersMenu">
          <Link to="/superAdmin/orders" className="d-block px-3 py-1 text-dark "><i className='fa-solid fa-receipt px-1 ' ></i>الطلبات الحالية</Link>
        </div>
      </div>


      {/* حسابى */}
      <div className="mb-2 d-flex justify-content-end flex-column ">
       <button
          className=" nav-link mainTitle d-block px-3  text-dark text-end fw-bold  "
          type='button'
          data-bs-toggle="collapse"
          data-bs-target="#usersMenu"
          aria-controls="usersMenu"
        >
           <i className='fa-solid fa-users px-1 ' ></i>
          المستخدمين 
           <i className='fa-solid fa-caret-down px-1 ' ></i>
        </button>
        <div className="collapse   fw-bold " id="usersMenu">
          <Link to="/superAdmin/addUser" className="d-block px-3 py-1 text-dark fw-bold  "><i className='fa-solid fa-user ' ></i>انشاء مستخدم</Link>
          <Link to="/superAdmin/currentUsers" className="d-block px-3 py-1 text-dark fw-bold  "><i className='fa-solid fa-users ' ></i>المستخدمين</Link>
          <Link to="/" className="d-block px-3 py-1 text-dark fw-bold  "  ><i className='fa-solid fa-right-from-bracket mx-1' ></i> تسجيل خروج </Link>
        </div>
      </div>

      
      {/* <div className='userInfo mb-2 d-flex justify-content-center align-items-center  py-4 ' >
        <p>Mr / {"name"} {"lastName"} </p>
        <p className='userIcon d-flex justify-content-center align-items-center mx-1 ' ><i className='fa-solid fa-user ' ></i></p>
        
        
      </div> */}

     

      
    </nav>
  </div>
</div>
  )
}

export default SaidSuper
