import UserList from "../../components/UserList";
import AdminHeader from "../../components/AdminHeader";

const AdminDashboard=()=>{

    return (
        <div className="text-center ">
            <AdminHeader />
            <div className="text-center flex items-center justify-center">
                <UserList />
            </div>
        </div>
    );
}


export default AdminDashboard;