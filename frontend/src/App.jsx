import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



const App = () => {
    return (
        <div>
            <ToastContainer/>
            <Header />
            <Outlet />
        </div>
    );
};


export default App;
