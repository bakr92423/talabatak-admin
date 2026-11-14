import React, { useEffect } from 'react'
import { listenForOrders, requestNotificationPermission } from './firebase';
import './App.css';
import 'swiper/css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CartProvider } from 'react-use-cart';
import ProtectRoute from './Components/ProtectRoute/ProtectRoute';
import LoginPage from './Pages/Login/LoginPage';
import HomePage from './Pages/Home/HomePage';
import Layout from './Components/Layout/Layout';
import CreateUser from './Pages/Users/CreateUser';
import CuurentUsers from './Pages/Users/CuurentUsers';
import UpdateUser from './Pages/Users/UpdateUser';
import DeleteUser from './Pages/Users/DeleteUser';
import TypeStore from './Pages/Stores/TypeStore';
import UpdateTypeStore from './Pages/Stores/UpdateTypeStore';
import DeleteTypeStore from './Pages/Stores/DeleteTypeStore';
import AddLocation from './Pages/Location/AddLocation';
import DeleteLocation from './Pages/Location/DeleteLocation';
import UpdateLocation from './Pages/Location/UpdateLocation';
import AddStores from './Pages/Stores/AddStores';
import CurrentStore from './Pages/Stores/CurrentStore';
import UpdateStore from './Pages/Stores/UpdateStore';
import DeleteStore from './Pages/Stores/DeleteStore';
import Dashboard from './Pages/AdminPages/AdminHome/Dashboard';
import CategoryPage from './Pages/AdminPages/Category/CategoryPage';
import UpdateCategory from './Pages/AdminPages/Category/UpdateCategory';
import DeleteCategory from './Pages/AdminPages/Category/DeleteCategory';
import AddItem from './Pages/AdminPages/Menu/AddItem';
import CurrentItems from './Pages/AdminPages/Menu/CurrentItems';
import UpdateItem from './Pages/AdminPages/Menu/UpdateItem';
import DeleteItem from './Pages/AdminPages/Menu/DeleteItem';
import OrdersPage from './Pages/AdminPages/Orders/OrdersPage';
import ReportPage from './Pages/AdminPages/Report/ReportPage';
import AddToHomeBanner from './Components/Banner/AddToHomeBanner';
import WorkTime from './Pages/AdminPages/Time/WorkTime';
import AddOffer from './Pages/AdminPages/Offer/AddOffer';
import CurrentOffer from './Pages/AdminPages/Offer/CurrentOffer';
import DeleteOffer from './Pages/AdminPages/Offer/DeleteOffer';
import UpdateOffer from './Pages/AdminPages/Offer/UpdateOffer';
import UpdatePassword from './Pages/Users/UpdatePassword';
import DeliveryHomePage from './Pages/DeliveryPages/Home/DeliveryHomePage';
import CurrentOrdersPage from './Pages/DeliveryPages/OrdersPages/CurrentOrdersPage';
import PreviousOrdersPage from './Pages/DeliveryPages/OrdersPages/PreviousOrdersPage';
import WalletPage from './Pages/DeliveryPages/Wallet/WalletPage';
import HomeAds from './Pages/Ads/HomeAds';
import Orders from './Pages/Orders/Orders';











const App = () => {
  useEffect(()=>{
    requestNotificationPermission();
    listenForOrders((payload)=>{
      alert(payload.notification.title + ' + ' + payload.notification.body)
    })
  },[])

 

   const rout=createBrowserRouter([
    {path:"/",element:<LoginPage />},
    {path:"/",element:<Layout /> ,children:[
      {path:"/Home",element:<HomePage />},
      {path:"/superAdmin/addUser",element:(<ProtectRoute allowedRoles={['super']} ><CreateUser/></ProtectRoute>)},
      {path:"/superAdmin/currentUsers",element:(<ProtectRoute allowedRoles={['super']} ><CuurentUsers /></ProtectRoute>)},
      {path:"/superAdmin/updateUser/:id",element:(<ProtectRoute allowedRoles={['super']} ><UpdateUser /></ProtectRoute>)},
      {path:"/superAdmin/deleteUser/:id",element:(<ProtectRoute allowedRoles={['super']} ><DeleteUser /></ProtectRoute>)},
      {path:"/superAdmin/addStore",element:(<ProtectRoute allowedRoles={['super']} ><AddStores /></ProtectRoute>)},
      {path:"/superAdmin/currentStore",element:(<ProtectRoute allowedRoles={['super']} ><CurrentStore /></ProtectRoute>)},
      {path:"/superAdmin/updateStore",element:(<ProtectRoute allowedRoles={['super']} ><UpdateStore /></ProtectRoute>)},
      {path:"/superAdmin/typeStore",element:(<ProtectRoute allowedRoles={['super']} ><TypeStore /></ProtectRoute>)},
      {path:"/superAdmin/updateTypeStore/:id",element:(<ProtectRoute allowedRoles={['super']} ><UpdateTypeStore /></ProtectRoute>)},
      {path:"/superAdmin/deleteTypeStore/:id",element:(<ProtectRoute allowedRoles={['super']} ><DeleteTypeStore /></ProtectRoute>)},
      {path:"/superAdmin/addAds",element:(<ProtectRoute allowedRoles={['super']} ><HomeAds /></ProtectRoute>)},
      {path:"/superAdmin/orders",element:(<ProtectRoute allowedRoles={['super']} ><Orders /></ProtectRoute>)},
      {path:"/superAdmin/addLocation",element:(<ProtectRoute allowedRoles={['super']} ><AddLocation /></ProtectRoute>)},
      {path:"/superAdmin/updateLocation",element:(<ProtectRoute allowedRoles={['super']} ><UpdateLocation /></ProtectRoute>)},
      {path:"/superAdmin/deleteLocation",element:(<ProtectRoute allowedRoles={['super']} ><DeleteLocation /></ProtectRoute>)},
      {path:"/superAdmin/updateStore/:id",element:(<ProtectRoute allowedRoles={['super']} ><UpdateStore /></ProtectRoute>)},
      {path:"/superAdmin/deleteStore/:id",element:(<ProtectRoute allowedRoles={['super']} ><DeleteStore /></ProtectRoute>)},
      {path:"/admin/Home",element:(<ProtectRoute allowedRoles={['admin']} ><Dashboard /></ProtectRoute>)},
      {path:"/admin/category",element:(<ProtectRoute allowedRoles={['admin']} ><CategoryPage /></ProtectRoute>)},
      {path:"/admin/updateCategory/:id",element:(<ProtectRoute allowedRoles={['admin']} ><UpdateCategory /></ProtectRoute>)},
      {path:"/admin/deleteCategory/:id",element:(<ProtectRoute allowedRoles={['admin']} ><DeleteCategory /></ProtectRoute>)},
      {path:"/admin/addItem",element:(<ProtectRoute allowedRoles={['admin']} ><AddItem /></ProtectRoute>)},
      {path:"/admin/currentItems",element:(<ProtectRoute allowedRoles={['admin']} ><CurrentItems /></ProtectRoute>)},
      {path:"/admin/updateItem/:id",element:(<ProtectRoute allowedRoles={['admin']} ><UpdateItem/></ProtectRoute>)},
      {path:"/admin/deleteItem/:id",element:(<ProtectRoute allowedRoles={['admin']} ><DeleteItem/></ProtectRoute>)},
      {path:"/admin/addOffer",element:(<ProtectRoute allowedRoles={['admin']} ><AddOffer/></ProtectRoute>)},
      {path:"/admin/currentOffer",element:(<ProtectRoute allowedRoles={['admin']} ><CurrentOffer/></ProtectRoute>)},
      {path:"/admin/deleteOffer/:id",element:(<ProtectRoute allowedRoles={['admin']} ><DeleteOffer/></ProtectRoute>)},
      {path:"/admin/updateOffer/:id",element:(<ProtectRoute allowedRoles={['admin']} ><UpdateOffer/></ProtectRoute>)},
      {path:"/admin/currentOrders",element:(<ProtectRoute allowedRoles={['admin']} ><OrdersPage/></ProtectRoute>)},
      {path:"/admin/report",element:(<ProtectRoute allowedRoles={['admin']} ><ReportPage/></ProtectRoute>)},
      {path:"/admin/workTime",element:(<ProtectRoute allowedRoles={['admin']} ><WorkTime/></ProtectRoute>)},
      {path:"/admin/updatePassword",element:(<ProtectRoute allowedRoles={['admin']} ><UpdatePassword/></ProtectRoute>)},
      {path:"/admin/deliveryHome",element:(<ProtectRoute allowedRoles={['delivery']} ><DeliveryHomePage/></ProtectRoute>)},
      {path:"/delivery/currentOrders",element:(<ProtectRoute allowedRoles={['delivery']} ><CurrentOrdersPage/></ProtectRoute>)},
      {path:"/delivery/previousOrders",element:(<ProtectRoute allowedRoles={['delivery']} ><PreviousOrdersPage/></ProtectRoute>)},
      {path:"/delivery/wallet",element:(<ProtectRoute allowedRoles={['delivery']} ><WalletPage/></ProtectRoute>)},
      {path:"/delivery/updatePassword",element:(<ProtectRoute allowedRoles={['delivery']} ><UpdatePassword/></ProtectRoute>)},


     
    ]}
    
  ])


  return (
    <div>
       <CartProvider>
      <RouterProvider router={rout} ></RouterProvider>
        </CartProvider>
        <AddToHomeBanner/>
     
      
    
    
      
    </div>
  )
}

export default App
