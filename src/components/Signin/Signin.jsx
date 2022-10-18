import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { authLogin } from '../../context/reduderActions';

function Signin() {
    const [form, setForm] = useState({ user: '', password: '' });
    const [controller, dispatch] = UserAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form)
        try {
            await authLogin(dispatch, { user: form.user, password: form.password });
            navigate('/home', { replace: true });
        } catch (error) {
            console.log(error);
        }
        setForm({ user: '', password: '' })
    };
    return (
        <div className='max-w-[700px] mx-auto my-16 p-4' >
            <h1 className='text-2xl font-bold py-2'>
                Sign In
            </h1>
            <p className='text-sm text-gray-500'>
                Don't have an account yet? <Link to={'/signup'} className='text-blue-500 underline'>Sign Up</Link>
            </p>
            <form className='mt-4' onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-sm font-bold mb-2'>User Name</label>
                    <input type='text' className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500' name='user' value={form.user}
                        onChange={handleChange} />
                </div>
                <div className='mb-4'>
                    <label className='block text-sm font-bold mb-2'>Password</label>
                    <input type='password' className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500' name='password' value={form.password} onChange={handleChange} />
                </div>
                <div className='mb-4'>
                    <button className='w-full bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 focus:outline-none'>Sign In</button>
                </div>
            </form>
            <progress className='w-full rounded-lg' value={controller.loading && 100} max='100' />
        </div>
    )
}

export default Signin