import { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../store/slices/userApiSlice";
import { setCredentials } from "../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const RegisterScreen = () => {
    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [register,{isSuccess,isLoading,isError}]=useRegisterMutation();

    const { userInfo }=useSelector((state)=> state.auth)

    useEffect(()=>{
        if(userInfo){
            navigate('/');
        }
    },[navigate,userInfo])

    const submitHandler = async (e) => {
        e.preventDefault();
        if(password != confirmPassword){
            toast.error('password does not match');
        }else{
            try {
                const response =await register({name, email,password}).unwrap();
                dispatch(setCredentials({...response}))
                navigate('/');

            } catch (error) {
                toast.error(error?.data?.message);
                
            }
        }
         
    };

    return (
        <div>
            <FormContainer>
                <h1 className="text-2xl font-bold mb-5  text-center">Sign Up</h1>

                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" disabled={isLoading} className={`w-full py-2 bg-green-600 text-white rounded-lg mt-3 ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"}`}>
                        Sign Up
                    </button>
                </form>

                <div className="py-3 text-center">
                    Already have an account?
                    <Link to="/login" className="text-blue-600">
                        Login now
                    </Link>
                </div>
            </FormContainer>
        </div>
    );
};

export default RegisterScreen;
