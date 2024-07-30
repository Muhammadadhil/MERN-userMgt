import { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get("/api/admin/getUsers");
        setUsersList(response.data);
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
                                    {usersList.map((user, index) => (
                                        <tr key={user.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{user._id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <button className="px-4 py-2 ml-4 bg-blue-500 text-white rounded">edit</button>
                                                <button className="px-4 py-2 border ml-4 border-blue-500 text-blue-500 rounded hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300 active:bg-blue-800">
                                                    Button
                                                </button>

                                                <button className="px-4 py-2 ml-4 bg-red-500 text-white rounded">delete</button>
                                            </td>
                                        </tr>
                                    ))}
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
