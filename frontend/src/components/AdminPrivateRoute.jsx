import { useSelector } from "react-redux"
import { Outlet , Navigate} from "react-router-dom";

const AdminPrivateRoute = () => {

    const {isAdminAuthenticated}=useSelector(state => state.auth);
    return isAdminAuthenticated ? <Outlet /> : <Navigate to="/admin" />;
}

export default AdminPrivateRoute
