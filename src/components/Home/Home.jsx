import React from 'react';
import { UserAuth } from '../../context/AuthContext';
import { authLogout } from '../../context/reduderActions';
import { useNavigate } from 'react-router-dom'

function Account() {
    const [controller, dispatch] = UserAuth();
    const { user } = controller;
    const navigate = useNavigate();



    return (
        <div className='max-w-[600px] mx-auto my-16 p-4' >
            <h1 className='text-2xl font-bold py-2'> Account</h1>
            <p className='text-sm text-gray-500'>User: {user.email}</p>
        </div>
    )
}
export default Account
