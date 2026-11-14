import React from 'react'
import { Link } from 'react-router-dom'

const Said= () => {
  

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

   

      {/*  الطلبات */}
      <div className="mb-2 d-flex justify-content-end flex-column fw-bold ">
         <button
          className=" nav-link mainTitle d-block px-3 py-2 text-dark text-end "
          type='button'
          data-bs-toggle="collapse"
          data-bs-target="#ordersMenu"
          aria-expanded="true"
          aria-controls="ordersMenu"
        >
          <i className='fa-solid fa-bag-shopping px-1 ' ></i>
          الطلبات 
          <i className='fa-solid fa-caret-down px-1 ' ></i>
        </button>
        <div className="collapse " id="ordersMenu">
          <Link to="/delivery/currentOrders" className="d-block px-3 py-1 text-dark "><i className='fa-solid fa-truck-fast-large px-1 ' ></i>الطلبات الحالية</Link>
          <Link to="/delivery/previousOrders" className="d-block px-3 py-1 text-dark "><i className='fa-solid fa-check-double px-1 ' ></i>الطلبات السابقة</Link>
        </div>
      </div>

       {/*  المحفظة */}
      <div className="mb-2 d-flex justify-content-end flex-column fw-bold ">
         <button
          className=" nav-link mainTitle d-block px-3 py-2 text-dark text-end "
          type='button'
          data-bs-toggle="collapse"
          data-bs-target="#Menu"
          aria-controls="Menu"
        >
          <i className='fa-solid fa-coins px-1 ' ></i>
          المحفظة 
          <i className='fa-solid fa-caret-down px-1 ' ></i>
        </button>
        <div className="collapse " id="Menu">
          <Link to="/delivery/wallet" className="d-block px-3 py-1 text-dark "><i className='fa-solid fa-credit-card px-1 ' ></i>محفظتى</Link>
        </div>
      </div>



      {/* حسابى */}
      <div className="mb-2 d-flex justify-content-end flex-column ">
       <button
          className=" nav-link mainTitle d-block px-3 py-2 text-dark text-end fw-bold  "
          type='button'
          data-bs-toggle="collapse"
          data-bs-target="#usersMenu"
          aria-controls="usersMenu"
        >
           <i className='fa-solid fa-user px-1 ' ></i>
          المستخدمين 
           <i className='fa-solid fa-caret-down px-1 ' ></i>
        </button>
        <div className="collapse   fw-bold " id="usersMenu">
          <Link to="/delivery/updatePassword" className="d-block px-3 py-1 text-dark fw-bold  "><i className='fa-solid fa-unlock-keyhole ' ></i>تحديث كلمة المرور</Link>
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

export default Said
