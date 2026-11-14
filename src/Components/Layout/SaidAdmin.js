import React from 'react'
import { Link } from 'react-router-dom'

const SaidAdmin = () => {
  

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

   

      {/*  الاقسام */}
      <div className="mb-2 d-flex justify-content-end flex-column fw-bold ">
         <button
          className=" nav-link mainTitle d-block px-3 py-2 text-dark text-end "
          type='button'
          data-bs-toggle="collapse"
          data-bs-target="#storeMenu"
          aria-expanded="true"
          aria-controls="storeMenu"
        >
          <i className='fa-solid fa-layer-group px-1 ' ></i>
          الاقسام 
          <i className='fa-solid fa-caret-down px-1 ' ></i>
        </button>
        <div className="collapse " id="storeMenu">
          <Link to="/admin/category" className="d-block px-3 py-1 text-dark "><i className='fa-solid fa-table-cells-large px-1 ' ></i>الاقسام</Link>
        </div>
      </div>

       {/*  القائمة */}
      <div className="mb-2 d-flex justify-content-end flex-column fw-bold ">
         <button
          className=" nav-link mainTitle d-block px-3 py-2 text-dark text-end "
          type='button'
          data-bs-toggle="collapse"
          data-bs-target="#Menu"
          aria-controls="Menu"
        >
          <i className='fa-solid fa-store px-1 ' ></i>
          القائمة 
          <i className='fa-solid fa-caret-down px-1 ' ></i>
        </button>
        <div className="collapse " id="Menu">
          <Link to="/admin/addItem" className="d-block px-3 py-1 text-dark "><i className='fa-solid fa-circle-plus px-1 ' ></i> اضافة صنف</Link>
          <Link to="/admin/currentItems" className="d-block px-3 py-1 text-dark "> <i className='fa-solid fa-box-open px-1 ' ></i>الاصناف الحالية</Link>
        </div>
      </div>
       {/*  العروض */}
      <div className="mb-2 d-flex justify-content-end flex-column fw-bold ">
         <button
          className=" nav-link mainTitle d-block px-3 py-2 text-dark text-end "
          type='button'
          data-bs-toggle="collapse"
          data-bs-target="#offerMenu"
          aria-controls="offerMenu"
        >
          <i className='fa-solid fa-tags px-1 ' ></i>
          العروض 
          <i className='fa-solid fa-caret-down px-1 ' ></i>
        </button>
        <div className="collapse " id="offerMenu">
          <Link to="/admin/addOffer" className="d-block px-3 py-1 text-dark "><i className='fa-solid fa-circle-plus px-1 ' ></i> اضافة عرض</Link>
          <Link to="/admin/currentOffer" className="d-block px-3 py-1 text-dark "> <i className='fa-solid fa-box-open px-1 ' ></i>العروض الحالية</Link>
        </div>
      </div>
       {/*  الطلبات */}
      <div className="mb-2 d-flex justify-content-end flex-column fw-bold ">
         <button
          className=" nav-link mainTitle d-block px-3 py-2 text-dark text-end "
          type='button'
          data-bs-toggle="collapse"
          data-bs-target="#orderMenu"
          aria-controls="orderMenu"
        >
          <i className='fa-solid fa-bell-concierge px-1 ' ></i>
          الطلبات 
          <i className='fa-solid fa-caret-down px-1 ' ></i>
        </button>
        <div className="collapse " id="orderMenu">
          <Link to="/admin/currentOrders" className="d-block px-3 py-1 text-dark "> <i className='fa-solid fa-receipt px-1 ' ></i>الطلبات الحالية</Link>
        </div>
      </div>
       {/*  التقارير */}
      <div className="mb-2 d-flex justify-content-end flex-column fw-bold ">
         <button
          className=" nav-link mainTitle d-block px-3 py-2 text-dark text-end "
          type='button'
          data-bs-toggle="collapse"
          data-bs-target="#reportMenu"
          aria-controls="reportMenu"
        >
          <i className='fa-solid fa-chart-simple px-1 ' ></i>
          التقارير 
          <i className='fa-solid fa-caret-down px-1 ' ></i>
        </button>
        <div className="collapse " id="reportMenu">
          <Link to="/admin/report" className="d-block px-3 py-1 text-dark "> <i className='fa-solid fa-file-lines px-1 ' ></i> التقارير</Link>
        </div>
      </div>
       {/*  المواعيد */}
      <div className="mb-2 d-flex justify-content-end flex-column fw-bold ">
         <button
          className=" nav-link mainTitle d-block px-3 py-2 text-dark text-end "
          type='button'
          data-bs-toggle="collapse"
          data-bs-target="#timeMenu"
          aria-controls="timeMenu"
        >
          <i className='fa-solid fa-clock px-1 ' ></i>
          الموعيد 
          <i className='fa-solid fa-caret-down px-1 ' ></i>
        </button>
        <div className="collapse " id="timeMenu">
          <Link to="/admin/workTime" className="d-block px-3 py-1 text-dark "> <i className='fa-solid fa-business-time px-1 ' ></i> مواعيد العمل</Link>
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
          <Link to="/admin/updatePassword" className="d-block px-3 py-1 text-dark fw-bold  "><i className='fa-solid fa-unlock-keyhole ' ></i>تحديث كلمة المرور</Link>
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

export default SaidAdmin
