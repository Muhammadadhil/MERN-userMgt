import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../store/slices/authSlice";

const AdminHeader = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    };

    const isAdminAuthenticated = useSelector((state) => state.auth.isAdminAuthenticated);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const mutation=useMutation(apiLogout,{
    //     onSuccess:()=>{
    // dispatch(logoutAdmin());
    // navigate('/admin');
    //     },
    //     onError:(error)=>{
    //         console.error("Logout failed:", error);
    //     }
    // })

    const logoutHandler = async () => {
        try {
            const response = await axios.post("/api/admin/logout");
            console.log("backend logout response:", response);
            dispatch(logoutAdmin());
            navigate('/admin');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <header className="bg-slate-900 text-white">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">
                    MERN App
                </Link>

                <nav className="hidden lg:flex lg:items-center lg:space-x-4">
                    {isAdminAuthenticated && <div className="relative">
                        <button className="flex items-center space-x-2" onClick={toggleDropDown}>
                            <span>hello, admin</span>
                        </button>
                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-20  group-hover:block">
                                
                                <button onClick={logoutHandler} className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>}
                </nav>
            </div>
        </header>
    );
};

export default AdminHeader;
