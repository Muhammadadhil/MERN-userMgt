import { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/slices/userApiSlice";
import { setCredentials } from "../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const LoginScreen = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate("/");
        } catch (error) {
            toast.error(error?.data?.message);
        }
    };

    return (
        <div>
            {isLoading && <Loader />}
            <FormContainer>
                <h1 className="text-2xl font-bold mb-5  text-center">Sign In</h1>
                <form onSubmit={submitHandler}>
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

                    <button type="submit" disabled={isLoading} className={`w-full py-2 bg-blue-600 text-white rounded-lg mt-3 ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}>
                        Sign In
                    </button>
                </form>

                <div className="py-3 text-center">
                    Dont have an account?
                    <Link to="/register" className="text-blue-600">
                        Register
                    </Link>
                </div>
            </FormContainer>
        </div>
    );
};

export default LoginScreen;
