import { Navigate, Outlet } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';


export const ProtecRoute = () => {
    const [controller] = UserAuth();
    const { user } = controller;
    return (
        user ? <Outlet /> : <Navigate to='/' />
    )
}

export default ProtecRoute