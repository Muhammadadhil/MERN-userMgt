import FormContainer from "@/src/components/FormContainer";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const CreateUser = () => {

    const [name,setName]=useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const navigate=useNavigate();
    

    const submitHandler=async()=>{

        if(!name && !email && !password){
            toast.error("please fill the fields");
            return 
        }

        try {
            const res = await axios.post("/api/admin/createUser", { name, email, password });
            console.log(res);
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
        }
    }

  return (
      <div>
          <FormContainer>
              <h1 className="text-2xl font-bold mb-5  text-center">Create New User</h1>

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



                  <button type="button" onClick={submitHandler} className={`w-full py-2 bg-green-600 text-white rounded-lg mt-3 hover:bg-green-700`}>
                      Create User
                  </button>
              </form>
          </FormContainer>
      </div>
  );
}

export default CreateUser
