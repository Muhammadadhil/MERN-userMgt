import { useState } from "react";
import FormContainer from "../../components/FormContainer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate(); 

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill in both email and password.");
            return;
        }

        try {
            const response = await axios.post("/api/admin", { email, password });
            console.log("axios res:", response);
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-28 mt-28 text-center">Welcome admin</h1>
            <FormContainer>
                <h1 className="text-2xl font-bold mb-5  text-center"> Sign In</h1>
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

                    <button type="submit" className={`w-full py-2 bg-amber-600 text-white rounded-lg mt-3  hover:bg-amber-700`}>
                        Sign In
                    </button>
                </form>
            </FormContainer>
        </div>
    );
};

export default AdminLogin;
