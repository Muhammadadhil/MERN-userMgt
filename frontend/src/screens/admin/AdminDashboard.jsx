import { Link } from "react-router-dom";
import UserList from "../../components/UserList";

const AdminDashboard=()=>{

    return (
        <div className="text-center ">
            <div className="text-center flex items-center justify-center">
                <UserList />
            </div>
            <div>
                {/* <Link to='/createUser'> */}
                    <button className="bg-black w-28 h-10 text-white rounded-md hover:bg-slate-800">Add User</button>
                {/* </Link> */}
            </div>
        </div>
    );
}


export default AdminDashboard;