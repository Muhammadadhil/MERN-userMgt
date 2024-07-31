import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminHeader from "../../components/AdminHeader";


const AdminLayout = () => {
    return (
        <div>
            <ToastContainer />
            <AdminHeader />
            <Outlet />
        </div>
    );
};

export default AdminLayout;