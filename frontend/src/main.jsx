import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import HomeScreen from './screens/user/HomeScreen.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider  } from 'react-router-dom'
import LoginScreen from './screens/user/LoginScreen.jsx'
import RegisterScreen from './screens/user/RegisterScreen.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux';
import ProfileScreen from './screens/user/ProfileScreen.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import AdminLogin from './screens/admin/AdminLogin.jsx';
import AdminLayout from './screens/admin/AdminLayout.jsx';
import AdminDashboard from './screens/admin/AdminDashboard.jsx'


const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<App />}>
                <Route index={true} path="/" element={<HomeScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />

                {/* private Routes */}
                <Route path="" element={<PrivateRoute />}>
                    <Route path="/profile" element={<ProfileScreen />} />
                </Route>
            </Route>
            <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/dashboard" element={<AdminDashboard />} />
            </Route>
        </>
    )
);




ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    </Provider>
);
