import FormContainer from "@/src/components/FormContainer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditUser = () => {

    const[name,setName]=useState();
    const [email, setEmail] = useState();
    const {id}=useParams();

    const navigate=useNavigate();

    useEffect(()=>{
        fetchUserDetails()
    },[])

    const fetchUserDetails= async()=>{
        try {
            const response =await axios.get(`/api/admin/getUserInfo/${id}`);
            setName(response?.data?.userDetails.name);
            setEmail(response?.data?.userDetails.email);
        } catch (error) {
            console.log(error.message)
        }
    }


    const updateHandler= async ()=>{
        try {
            await axios.post(`/api/admin/updateUserInfo`,{id,name,email});
            toast('Updated User Info');
            navigate('/dashboard');
            
        } catch (error) {
            toast.error('Error updating user info')
            console.log(error.message);
            
        }
    }

  return (
      <div>
          <FormContainer>
              <h1 className="text-2xl font-bold mb-5  text-center">Edit User details</h1>

              <form >
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
                  <button type="button" onClick={updateHandler} className={`w-full py-2 bg-gray-600 text-white rounded-lg mt-3 hover:bg-green-700`}>
                      Update User
                  </button>
              </form>

          </FormContainer>
      </div>
  );
}

export default EditUser
