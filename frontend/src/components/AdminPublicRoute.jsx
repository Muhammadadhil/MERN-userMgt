import { useSelector } from "react-redux";
import { Navigate,Outlet } from "react-router-dom";


const AdminPublicRoute=()=>{

    const adminAuth=useSelector((state) => state.auth.isAdminAuthenticated);

    return adminAuth?<Navigate to='/dashboard'/>:<Outlet/>
}

export default AdminPublicRoute;
