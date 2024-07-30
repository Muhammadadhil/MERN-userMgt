import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useLogoutMutation } from "../store/slices/userApiSlice";
import { logout } from "../store/slices/authSlice";
import { toast } from "react-toastify";



const Header = () => {
    const { userInfo } = useSelector((state) => state.auth);

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropDown = () => {
        console.log('toggle drop down');
        setIsOpen(!isOpen);
    };
    
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [logoutAPiCall]=useLogoutMutation()  //creating function to create this mutation

    const logoutHandler=async ()=>{
        try {
            await logoutAPiCall().unwrap(); //unwrap -to access the raw result of a fulfilled or rejected promise from an API call.
            dispatch(logout());
            navigate("/");
            toast('logout successfully')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <header className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">
                    MERN App
                </Link>

                <nav className="hidden lg:flex lg:items-center lg:space-x-4">
                    {userInfo ? (
                        <div className="relative">
                            <button className="flex items-center space-x-2" onClick={toggleDropDown}>
                                <span>{userInfo.name}</span>
                            </button>
                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-20  group-hover:block">
                                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">
                                        Profile
                                    </Link>
                                    <button onClick={logoutHandler} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="flex items-center space-x-1">
                                <FaSignInAlt />
                                <span>Sign In</span>
                            </Link>
                            <Link to="/register" className="flex items-center space-x-1">
                                <FaSignOutAlt />
                                <span>Sign Up</span>
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
