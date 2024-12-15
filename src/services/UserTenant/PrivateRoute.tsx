import { Outlet, Navigate } from 'react-router-dom';
import Cookies from "js-cookie";

const PrivateRoute = () => {
    const token = Cookies.get("accessToken");
    console.log('tes token', token)
    if (!token) {
        return <Navigate to="/login" />;
    }

    console.log("Token ditemukan, melanjutkan ke dashboard.");
    return <Outlet />;
};

export default PrivateRoute;
