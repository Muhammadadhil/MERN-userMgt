import { useEffect, useState } from "react";
import FormContainer from "../../components/FormContainer";
import { useNavigate } from "react-router-dom";
import { setCredentials , logout} from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLogoutMutation, useUpdateUserMutation } from "../../store/slices/userApiSlice";
import Loader from "../../components/Loader";
import axios from "axios";


const ProfileScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [image,setImage]=useState("");
    const [imgUrl,setImgUrl]=useState("");

    const navigate = useNavigate();
    
    const { userInfo } = useSelector((state) => state.auth);
    const [logoutApiCall]=useLogoutMutation();
    const dispatch = useDispatch();

    const [updateProfile, { isLoading }] = useUpdateUserMutation();

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    }, [userInfo.name, userInfo.email]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password != confirmPassword) { 
            toast.error("password does not match");
        } else {
            try {
                const response = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password,
                    imgUrl,
                }).unwrap();

                dispatch(setCredentials({ ...response }));
                navigate("/");
                toast.success("profile updated ");
            } catch (error) {
                console.log(error);
                if(error.status == 401){
                    dispatch(logout());
                    await logoutApiCall()
                    toast.error("Session expired. Please log in again.");
                    navigate("/login");
                }else{
                    toast.error(error?.data?.message);
                }
            }
        }
    };

    const handlefileUpload= async ()=>{
        
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "ixmkptzh");
        formData.append("cloud_name", "dyq4b7nyb");

        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/dyq4b7nyb/image/upload", formData);
            console.log("cloudinary res:", response);
            toast.success('image uploaded successfully')
            setImgUrl(response?.data?.secure_url);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <div>
            <FormContainer>
                <h1 className="text-2xl font-bold mb-5  text-center">Update Profile</h1>
                <div className=" flex w-full h-[7rem] items-center justify-center">
                    <label htmlFor="inputfile" className="w-[7rem] h-full rounded-full bg-slate-600 ">
                        {!imgUrl ? <img src="/public/images/profile-icon-free-1.png" alt="image" /> : <img className="" src={imgUrl} alt="cloud img" />}
                    </label>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} id="inputfile" hidden />
                </div>
                <div className="flex justify-center mt-7">
                    <button className="w-24 h-8 bg-black text-white rounded-lg " onClick={handlefileUpload}>
                        upload image
                    </button>
                </div>
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
                    {isLoading && <Loader />}

                    <button type="submit" className={`w-full py-2 bg-green-600 text-white rounded-lg mt-3 "hover:bg-green-700 `}>
                        Update Profile
                    </button>
                </form>
            </FormContainer>
        </div>
    );
};

export default ProfileScreen;

