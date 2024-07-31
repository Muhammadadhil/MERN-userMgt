import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
// import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method
// import { Toast } from "primereact/toast";

const UserList = () => {
    const [usersList, setUsersList] = useState([]);
    // const toast=useRef(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get("/api/admin/getUsers");
        setUsersList(response.data);
    };
    const navigate = useNavigate();

    const editHandler = (id) => {
        navigate(`/edituser/${id}`);
    };

    const deleteUserHandler = async (userId) => {
        console.log("delete");
        await axios.delete(`/api/admin/deleteuser/${userId}`);
        setUsersList(usersList.filter((user) => user._id !== userId));
        toast("Deleted user successfully");
    };

    return (
        //   <div className="mt-8 w-8/12 h-screen bg-neutral-200 rounded-xl">
        //   </div>

        <div className="container mx-auto mt-10">
            <h3 className="my-8 font-bold text-4xl text-gray-700">Users list</h3>
            <div className="flex flex-col">
                <div className="">
                    <div className="min-w-full py-2 align-middle inline-block">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            No.
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            id
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {usersList.length == 0 ? (
                                        <div className="w-full h-96 flex items-center justify-center text-center">
                                            <h1 className="text-2xl font-bold text-slate-700">no users to list</h1>
                                        </div>
                                    ) : (
                                        usersList
                                            .filter((user) => !user.isAdmin)
                                            .map((user, index) => (
                                                <tr key={user._id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{user._id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <button
                                                            className="px-4 py-2 border ml-4 border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300 active:bg-blue-800"
                                                            onClick={() => editHandler(user._id)}
                                                        >
                                                            edit
                                                        </button>

                                                        <button className="px-4 py-2 ml-4 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => deleteUserHandler(user._id)}>
                                                            delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserList;
