import { Navigate } from "react-router-dom"

const protectRoute=({children,allowedRoles})=>{
    const userRole=JSON.parse(sessionStorage.getItem('userRole'))
    if(!allowedRoles.includes(userRole)){
        return <Navigate to='/' replace />
    }
    return children;

};



export default protectRoute