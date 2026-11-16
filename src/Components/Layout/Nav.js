import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Nav = () => {

    
  const stored = sessionStorage.getItem("user")
  const user = stored ? JSON.parse(stored) : null
  const name = user?.name || user?.store?.name || ""

  const getInitials = (fullName) => {
    if (!fullName) return ''
    const parts = fullName.trim().split(' ').filter(Boolean)
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }

  const initials = getInitials(name)


 
          
  return (
    <div className="Nav align-items-center col-12 d-flex justify-content-between " >
      <div className='d-flex align-items-center' ><h4 className='logo fw-bold mx-2 ' >Talabatk</h4><p className='textLogo mt-1 text-light fw-bold mx-2 ' >TB</p></div>

      <div className='d-flex align-items-center' ><h4 className='logo fw-bold mx-2 ' >{name}</h4><p className='textLogo mt-1 text-light fw-bold mx-2 ' >{initials}</p></div>

      

    
    </div>
  )
}

export default Nav
